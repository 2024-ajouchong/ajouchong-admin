import React, { useState, useEffect } from 'react';
import './reference.css';
import { fetchItems, deleteItem, createItem } from '../services/apiService';

const Reference = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null); // 특정 게시글 조회용 상태
    const [isWriting, setIsWriting] = useState(false); // 글쓰기 모달 상태
    const [newPost, setNewPost] = useState({ title: '', content: '', imageUrls: [] }); // 새 글 작성 상태

    // 게시글 불러오기
    const fetchPosts = async () => {
        setLoading(true);
        try {
            const data = await fetchItems('reference'); // 'reference' 엔드포인트로 데이터 가져오기
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
            const data = await fetchItems(`reference/${id}`); // 특정 ID로 게시글 조회
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
            await deleteItem('reference', id); // 'reference' 엔드포인트에 id로 삭제 요청
            alert(`${id}번 게시글이 삭제되었습니다.`);
            fetchPosts(); // 게시글 목록 새로 불러오기
        } catch (error) {
            setError("게시글 삭제 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // 글쓰기 모달 열기
    const openWriteModal = () => {
        setIsWriting(true);
    };

    // 글쓰기 모달 닫기
    const closeWriteModal = () => {
        setIsWriting(false);
        setNewPost({ title: '', content: '', imageUrls: [] });
    };

    // 게시글 작성하기
    const handleCreatePost = async () => {
        try {
            const data = await createItem('reference', newPost); // 새 글 작성 요청
            if (data.code === 1) {
                alert("게시글이 작성되었습니다.");
                closeWriteModal();
                fetchPosts(); // 새로고침
            } else {
                setError(data.message || "게시글 작성 중 오류가 발생했습니다.");
            }
        } catch (err) {
            setError("게시글 작성 요청 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        fetchPosts(); // 컴포넌트가 마운트될 때 게시글 목록 불러오기
    }, []);

    if (loading) return <p>불러오는 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="reference-board">
             <div className="post-button">
                <div className="wrapper">
                    <button onClick={openWriteModal}>글쓰기</button>
                </div>
            </div>

            {/* 글쓰기 모달 */}
            {isWriting && (
                <div className="modal">
                    <h2>새 글 작성</h2>
                    <input
                        type="text"
                        placeholder="제목"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    />
                    <textarea
                        placeholder="내용"
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="이미지 URL (쉼표로 구분)"
                        value={newPost.imageUrls.join(', ')}
                        onChange={(e) => setNewPost({
                            ...newPost,
                            imageUrls: e.target.value.split(',').map(url => url.trim())
                        })}
                    />
                    <button onClick={handleCreatePost}>작성</button>
                    <button onClick={closeWriteModal}>취소</button>
                </div>
            )}

            {/* 선택된 게시글 상세 보기 */}
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

            {/* 게시글 목록 */}
            <div className="posts-list">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.npost_id} className="reference-post">
                            <h3 className="reference-title">{post.npTitle}</h3>
                            <p className="reference-content">{post.npContent}</p>
                            <p className="reference-meta">
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
        </div>
    );
};

export default Reference;
