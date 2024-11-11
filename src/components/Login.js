import React, { useState } from 'react';
import { loginAdmin } from '../services/apiService'; // apiService에서 loginAdmin 함수 임포트
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 관리할 상태

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // 에러 메시지 초기화

        try {
            const response = await loginAdmin(email, password);

            // 로그인 성공 시 토큰을 로컬 스토리지에 저장하고 로그인 상태를 업데이트
            if (response.code === 1) {
                const { accessToken } = response.data; // tokenType은 사용하지 않음
                localStorage.setItem('token', accessToken); // 토큰만 저장
                setIsLoggedIn(true); // 로그인 상태 true로 설정
            
                alert('로그인에 성공했습니다.');
            } else {
                setError('로그인에 실패했습니다.');
            }
            
        } catch (err) {
            setError('로그인 요청 중 오류가 발생했습니다.');
            console.error(err);
        }
    };

    return (
        <main className="login-section">
            {isLoggedIn ? (
                <div className="welcome-message">
                    <img src="aurum_black.png" alt="Logo" className="login_logo" /> {/* 로고 이미지 */}
                    <h1>관리자님 환영합니다</h1>
                </div>
            ) : (
                <form className="login-form" onSubmit={handleLogin}>
                    <h2>AJOU UNIV</h2>
                    <br />
                    <h1>관리자 계정 로그인</h1>
                    <br />
                    <div className="login-input">
                        <input
                            type="email"
                            placeholder="email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="login-button">log in</button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </form>
            )}
        </main>
    );
};

export default Login;
