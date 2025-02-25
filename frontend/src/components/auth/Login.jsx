import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import useCustomLogin from "./../../hook/useCustomLogin"
import { useDispatch } from "react-redux"
import KakaoLogin from "./KakaoLogin"

const initState = {
  userEmail: "",
  userPw: "",
}

const Login = () => {
  const [loginParam, setLoginParam] = useState({ ...initState })
  const { doLogin, moveToPath } = useCustomLogin()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value
    setLoginParam({ ...loginParam })
  }

  const handleClickLogin = (e) => {
    doLogin(loginParam).then((data) => {
      console.log(data)
      if (data.error) {
        alert("이메일과 비밀번호를 확인해주세요")
      } else {
        alert("로그인 성공")
        moveToPath("/main")
      }
    })
  }

  return (
    <>
      <div className='login'>
        <div className='login-header'>
          <h1>
            <img src='/images/logo2.jpg' alt='' />
          </h1>
          <h3>로그인</h3>
          <button
            type='button'
            onClick={() => navigate(-1)}
            className='back-button'
          >
            〈
          </button>
        </div>
        <div className='login-con'>
          <div className='login-container'>
            <div>
              <label>이메일</label>
              <input
                type='email'
                name='userEmail'
                required
                onChange={handleChange}
                value={loginParam.userEmail}
              />
            </div>
            <div>
              <label>비밀번호</label>
              <input
                type='password'
                name='userPw'
                required
                onChange={handleChange}
                value={loginParam.userPw}
              />
            </div>
          </div>
          <button className='login-footer' onClick={handleClickLogin}>
            로그인
          </button>
          <button className='login-footer'>
            <KakaoLogin />
          </button>
        </div>
      </div>
    </>
  )
}

export default Login
