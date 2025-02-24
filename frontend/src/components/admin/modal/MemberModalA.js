import axios from 'axios'
import React, { useEffect, useState } from 'react'
import jwtAxios from '../../../util/jwtUtils'

const MemberModalA = ({memberId, setIsModal}) => {

  const [modal, setModal] = useState({})

  useEffect(()=> {

    const memberDetail = async () => {
      const res = await jwtAxios.get(`http://localhost:8090/admin/member/detail/${memberId}`);

      const data = res.data.member;

      console.log(data)

      setModal(data)
    }    

    memberDetail()


  },[])




  const closeBtn = () => {
    
    setIsModal(false)
    
  }

 
  return (
    <div className='admin-member-modal'>
      <div className='admin-member-modal-con'>
        <span className='close' onClick={closeBtn}>X</span>


        <form>
          <h1>회원 상세 정보</h1>
          <ul>
            <li>
              <label htmlFor="userName">이름</label>
              <input type='text' id = 'userName' value={modal.userName}></input>
            </li>
            <li>
              <label htmlFor="userEmail">이메일</label>
              <input type='text' id = 'userEmail' value={modal.userEmail}></input>
            </li>
            <li>
              <label htmlFor="userPw">비밀번호</label>
              <input type='text' id = 'userPw' value={modal.userPw}></input>
            </li>
            <li>
              <label htmlFor="phone">전화번호</label>
              <input type='text' id = 'phone' value={modal.phone}></input>
            </li>
            <li>
              <label htmlFor="nickName">닉네임</label>
              <input type='text' id = 'nickName' value={modal.nickName}></input>
            </li>
            <li>
              <label htmlFor="role">권한</label>
              <input type='text' id = 'role' value={modal.role}></input>
            </li>
            <li>
              <label htmlFor="id">id</label>
              <input type='text' id = 'id' value={modal.id}></input>
            </li>
            <li>
              <label htmlFor="career">career</label>
              <input type='text' id = 'career' value={modal.career}></input>
            </li>
            <li>
              <label htmlFor="age">age</label>
              <input type='text' id = 'age' value={modal.age}></input>
            </li>
            <li>
              <label htmlFor="address">address</label>
              <input type='text' id = 'address' value={modal.address}></input>
            </li>
            
          </ul>


        </form>

      </div>
    </div>
  )
}

export default MemberModalA