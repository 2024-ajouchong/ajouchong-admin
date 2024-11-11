import React from 'react';
import './Header.css'; 

const Header = ({ isLoggedIn, onLogout }) => {
    return (
      <header className="main-header">
        <div className="top-bar">
          <div className="top-links">
            <span><a href='/'>메인 페이지</a></span>
            {isLoggedIn && (
              <span className="logout-link" onClick={onLogout}>로그아웃</span> // 로그아웃 버튼 추가
            )}
          </div>
        </div>
        <div className="logo">
          <a href='/'><img src="aurum_white.png" alt="아우름 로고" className="logo-image" /></a>
        </div>
        <nav className="main-nav">
          <ul>
            <li><a href="/introduce">소개</a></li>
            <li><a href="/notice">소식</a></li>
            <li><a href="/communicate">소통</a></li>
            <li><a href="/reference">자료실</a></li>
            <li><a href="/welfare">학생복지</a></li>
          </ul>
        </nav>
      </header>
    );
}

export default Header;
