import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
      <div className="header-con">
        <div className="gnb">
          <h1 className="logo">
            <Link to={"/index"}>
              LOGO
              {/* <img src="" alt="" /> */}
            </Link>
          </h1>
          <ul>
            <li>괴외 선생님 찾기</li>
            <li>커뮤니티</li>
            <li>
              <Link to={"/index/join"}>로그인 / 회원가입</Link>
            </li>
            <li>고민 상담</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header