import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <div className="admin-header">
        <ul>
          <li>
            <Link to={'/'}>임시A</Link>
          </li>
          <li>
            <Link to={'/'}>임시B</Link>
          </li>
          <li>
            <Link to={'/'}>임시C</Link>
          </li>
          <li>
            <Link to={'/'}>관리자님</Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Header