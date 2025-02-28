import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCookie } from '../../util/cookieUtil';

const Header = () => {

  const [nickName, setNickName] = useState('');

  useEffect(() => {
    const cookie = getCookie("member");
    const cookieData = cookie.NickName;

    setNickName(cookieData);
    

  }, [])


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
            <Link to={'/'}>{nickName}</Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Header