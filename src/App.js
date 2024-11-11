import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Notice from './components/Notice';
import Introduce from './components/Introduce';
import Communicate from './components/Communicate';
import Reference from './components/Reference';
import Welfare from './components/Welfare';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // useNavigate 사용 가능

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // 토큰 삭제
    setIsLoggedIn(false); // 로그인 상태 업데이트
    alert('로그아웃 되었습니다.');
    navigate('/'); // 로그인 페이지로 리다이렉트
  };

  return (
    <div className="app-container">
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="content-wrapper">
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<div className="welcome-message">
                  <img src="aurum_black.png" alt="Logo" className="login_logo" />
                  <h1>관리자님 환영합니다</h1>
              </div>} />
              <Route path="/introduce" element={<Introduce />} />
              <Route path="/notice" element={<Notice />} />
              <Route path="/communicate" element={<Communicate />} />
              <Route path="/reference" element={<Reference />} />
              <Route path="/welfare" element={<Welfare />} />
            </>
          ) : (
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
