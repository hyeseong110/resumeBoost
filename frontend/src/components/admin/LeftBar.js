import React from 'react'
import { Link } from 'react-router-dom'

const LeftBar = () => {
  return (
    <>
      <div className="left-bar">
        <div className="left-bar-con">

          <div className="admin-top">
            <h1 className="logo">
              <Link to={"/main"}>
                {/* LOGO */}
                <img src="/images/logo2.jpg" alt="logo"/>
              </Link>
            </h1>
          </div>

          <div className="bottom">
            <ul>
              <li>
                <Link to={'/admin'}>HOME</Link>
              </li>
              <li>
                <Link to={'/admin/member'}>회원목록</Link>
              </li>
              <li>
                <Link to={'/admin/item'}>상품목록</Link>
              </li>
              <li>
                <Link to={'/admin/payment'}>결제목록</Link>
              </li>
              <li>
                <Link to={'/admin/post'}>주문처목록</Link>
              </li>
              <li>
                <Link to={'/admin/info'}>공지목록</Link>
              </li>
              <li>
                <Link to={'/admin/board'}>게시판목록</Link>
              </li>
            </ul>
          </div>
          
          

        </div>
      </div>
    </>
  )
}

export default LeftBar