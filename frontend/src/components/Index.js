import React from 'react'
import { Link } from 'react-router-dom'

const Index = () => {
  return (
    <>
      <div className='index'>
        <div className="index-con">

          <div className='join-button'>
            <ul>
              <li>
                <Link to={'/join'}>회원가입</Link> 
              </li>
              <li>
                <Link to={'/joinT'}>멘토 회원가입</Link>
              </li>
            </ul>
          </div>

          <div className='index-button'>
            <span>
              <Link to={'/index'}>메인 페이지</Link>
            </span>
          </div>

        </div>
      </div>
    </>
  )
}

export default Index