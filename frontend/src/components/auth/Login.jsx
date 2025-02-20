import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate();

  return (
    <>
      <div className="login">
        <div className="login-header">
          <h1><img src="/images/logo2.jpg" alt="" /></h1>
          <h3>로그인</h3>
          <button 
          type='button'
          onClick={()=>navigate("/main")}
          className='back-button'>
          〈
          </button>
        </div>
        <div className="login-con">
          <form>
            <div className="login-container">
              <div>
                <label>이메일</label>
                <input
                  type="email"
                  name="userEmail"
                  required
                />
              </div>
              <div>
                <label>비밀번호</label>
                <input
                  type="password"
                  name="userPw"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className='login-footer'
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login