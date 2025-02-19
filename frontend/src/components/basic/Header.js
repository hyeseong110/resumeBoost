import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
      <div className="header-con">
        <div className="gnb">
          <h1 className="logo">
            <Link to={"/main"}>
              LOGO
              {/* <img src="" alt="" /> */}
            </Link>
          </h1>
          <ul>
            <li>멘토 찾기</li>
            <li>
              <Link to={"/board"}>커뮤니티</Link>
            </li>
            <li>
              <Link to={"/auth/login"}>로그인</Link>
              /
              <Link to={"/auth/join"}>회원가입</Link>
            </li>
            <li>문의하기</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header