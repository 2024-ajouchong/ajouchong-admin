import React, { useState, useEffect } from 'react';
import './notice.css';
import { fetchItems, deleteItem } from '../services/apiService';

const Notice = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null); // 특정 게시글 조회용 상태

    // 게시글 불러오기
    const fetchPosts = async () => {
        setLoading(true);
        try {
            const data = await fetchItems('notice'); // 'notice' 엔드포인트로 데이터 가져오기
            if (data.code === 1) {
                setPosts(data.data);
            } else {
                setError(data.message || "게시글을 불러오는 중 오류가 발생했습니다.");
            }
        } catch (err) {
            setError("게시글을 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // 특정 게시글 조회하기
    const fetchPostById = async (id) => {
        setLoading(true);
        try {
            const data = await fetchItems(`notice/${id}`); // 특정 ID로 게시글 조회
            if (data.code === 1) {
                setSelectedPost(data.data); // 선택한 게시글을 상태로 저장
            } else {
                setError(data.message || "게시글을 조회하는 중 오류가 발생했습니다.");
            }
        } catch (err) {
            setError("게시글 조회 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // 게시글 삭제하기
    const deletePost = async (id) => {
        setLoading(true);
        try {
            await deleteItem('notice', id); // 'notice' 엔드포인트에 id로 삭제 요청
            alert(`${id}번 게시글이 삭제되었습니다.`);
            fetchPosts(); // 게시글 목록 새로 불러오기
        } catch (error) {
            setError("게시글 삭제 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(); // 컴포넌트가 마운트될 때 게시글 목록 불러오기
    }, []);

    if (loading) return <p>불러오는 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="notice-board">
            <div className='post-button'>
                <div className='wrapper'>
                    <button>글쓰기</button>
                </div>
            </div>

            <div className="posts-list">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.npost_id} className="notice-post">
                            <h3 className="notice-title">{post.npTitle}</h3>
                            <p className="notice-content">{post.npContent}</p>
                            <p className="notice-meta">
                                <span>좋아요: {post.npUserLikeCnt}</span> | 
                                <span> 조회수: {post.npHitCnt}</span> | 
                                <span> 작성일: {new Date(post.npCreateTime).toLocaleDateString()}</span>
                            </p>
                            <button onClick={() => fetchPostById(post.npost_id)}>상세보기</button>
                            <button onClick={() => deletePost(post.npost_id)}>삭제</button>
                        </div>
                    ))
                ) : (
                    <p>게시글이 없습니다.</p>
                )}
            </div>

            {selectedPost && (
                <div className="selected-post">
                    <h2>{selectedPost.npTitle}</h2>
                    <p>{selectedPost.npContent}</p>
                    <p>좋아요: {selectedPost.npUserLikeCnt}</p>
                    <p>조회수: {selectedPost.npHitCnt}</p>
                    <p>작성일: {new Date(selectedPost.npCreateTime).toLocaleDateString()}</p>
                    {selectedPost.imageUrls && selectedPost.imageUrls.length > 0 ? (
                        <p>이미지: {selectedPost.imageUrls.join(', ')}</p>
                    ) : (
                        <p>이미지가 없습니다.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Notice;
