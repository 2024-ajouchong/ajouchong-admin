import React from 'react';
import './introduce.css'; // 스타일링 파일이 필요하다면 임포트


//about/introduce 여따 쏴야함
// 수정이한테 api 보낼때 내용은 POST로 받아서 처리하라고 전달하셈

const setPageName = (pageNameContent) => {
    fetch("https://서버주소/about/introduce", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "pageName" : pageNameContent
        }),
      })
        .then((response) => response.json())
}

const Introduce = () => {
    return (
        <>
    <div class="introduceForm">
        <div class="introContent">
            <textarea name="" id="" placeholder="페이지이름,,">
                
            </textarea>
        </div>
        <div class="submitBtn">
            <button type="submit">업로드</button>
        </div>
    </div>
        </>
    );
}

export default Introduce;
