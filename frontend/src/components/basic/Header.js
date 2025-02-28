import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import useCustomLogin from "../../hook/useCustomLogin"

const Header = () => {
  const loginState = useSelector((state) => state.loginSlice)
  const { doLogout, moveToPath } = useCustomLogin()

  // 로컬 스토리지에서 role 정보를 가져옴
  const [role, setRole] = useState(localStorage.getItem("userRole") || null)

  // 로그인 상태가 변경될 때 로컬 스토리지에 role 정보 저장
  useEffect(() => {
    if (loginState.role && loginState.role[0]) {
      localStorage.setItem("userRole", loginState.role[0])
      setRole(loginState.role[0])
    } else {
      localStorage.removeItem("userRole")
      setRole(null)
    }
  }, [loginState.role])

  let detailUrl = ""

  if (role === "ROLE_ADMIN") {
    detailUrl = "/admin"
  } else {
    detailUrl = `/member/memberDetail/${loginState.id}`
  }

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      doLogout()
      localStorage.removeItem("userRole") // 로그아웃 시 role 정보 삭제
      moveToPath("/")
    }
  }

  return (
    <div className='header'>
      <div className='header-con'>
        <div className='gnb'>
          <div className='logo'>
            <h1 className='logo'>
              <Link to={"/main"}>
                <img src='/images/logo2.jpg' alt='' />
              </Link>
            </h1>
            {role === "ROLE_MEMBER" ? (
              <div className='role'>일반 회원</div>
            ) : role === "ROLE_MENTOR" ? (
              <div className='role'>멘토 회원</div>
            ) : role === "ROLE_ADMIN" ? (
              <div className='role'>관리자</div>
            ) : (
              <></>
            )}
          </div>
          <ul>
            <li>
              <Link to={"/member/mentorList"}>멘토 찾기</Link>
            </li>
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
            {role === "ROLE_ADMIN" ? (
              <>
                <li>
                  <Link to={"/admin"}>관리자 페이지</Link>
                </li>
              </>
            ) : (
              <li>
                <Link to={"/inquiry"}>고객센터</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
