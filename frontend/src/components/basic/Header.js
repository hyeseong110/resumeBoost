import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import loginSlice from "./../../slice/loginSlice"
import useCustomLogin from "../../hook/useCustomLogin"

const Header = () => {
  const loginState = useSelector((state) => state.loginSlice)

  let detailUrl = ""

  if (loginState.role && loginState.role[0] === "ROLE_MEMBER") {
    detailUrl = "/member/memberDetail"
  } else {
    detailUrl = "/member/mentorDetail"
  }

  const { doLogout, moveToPath } = useCustomLogin()

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      doLogout()
      moveToPath("/")
    }
  }

  return (
    <div className='header'>
      <div className='header-con'>
        <div className='gnb'>
          <h1 className='logo'>
            <Link to={"/main"}>
              <img src='/images/logo2.jpg' alt='' />
            </Link>
          </h1>
          <ul>
            <li>멘토 찾기</li>
            <li>
              <Link to={"/board"}>커뮤니티</Link>
            </li>
            {loginState.userEmail ? (
              <>
                <li>
                  <Link to={detailUrl}>{loginState.NickName}님</Link>
                </li>
                <li onClick={handleLogout}>로그아웃</li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/auth/login"}>로그인</Link>/
                  <Link to={"/auth/join"}>회원가입</Link>
                </li>
              </>
            )}
            {loginState.role && loginState.role[0] === "ROLE_ADMIN" ? (
              <>
                <li>관리자페이지</li>
              </>
            ) : (
              <></>
            )}
            <li>문의하기</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
