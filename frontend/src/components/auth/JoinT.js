import React from 'react'

const JoinT = () => {
  return (
    <>
      <div className='join'>
        <div className="join-con">
          <form action="" method="post">
            <h1>회원가입</h1>

            <ul>
              <li>
                <label htmlFor="email" aria-placeholder='이메일 입력'>이메일 :</label>
                <input type="text" name="email" id="email" />
              </li>
              <li>
                <label htmlFor="pw" aria-placeholder='비밀번호 입력'>비밀번호 : </label>
                <input type="password" name="pw" id="pw" />
              </li>
              <li>
                <label htmlFor="carrer" aria-placeholder='경력'>경력 : </label>
                <input type="text" name="carrer" id="carrer" />
              </li>
              <li>
                <span>이전</span>
                <input type="submit" value="회원가입" />
              </li>
            </ul>
          </form>
        </div>
    </div>
  </>
  )
}

export default JoinT