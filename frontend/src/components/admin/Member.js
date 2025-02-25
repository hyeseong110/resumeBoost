import axios from 'axios'
import React, { useEffect, useState } from 'react'
import jwtAxios from '../../util/jwtUtils'
import { Link } from 'react-router-dom';
import MemberModalA from './modal/MemberModalA';
import Paging from './paging/Paging';

const Member = () => {


  

  const [pageData, setPageData] = useState({});

  // 모달 
  const [isModal, setIsModal] = useState(false)
  const [memberId, setMemberId] = useState("")


  useEffect(()=> {

    const memberList = async () => {
      const res = await jwtAxios.get('http://localhost:8090/admin/member');
      
      console.log(res.data); 
      
      const data = res.data.member; // 받은 모든 데이터
      
      // 페이징 메서드 
      const currentPage = data.number;
      const totalPages = data.totalPages;
      const blockNum = 3;

      const memberList = data.content;
      
      const startPage = ((Math.floor(currentPage/blockNum) * blockNum) + 1 <= totalPages ? (Math.floor(currentPage/blockNum) * blockNum) + 1 : totalPages);
      const endPage = (startPage + blockNum) - 1 < totalPages ? (startPage + blockNum) - 1 : totalPages;


      setPageData({
        startPage: startPage,
        endPage: endPage,
        memberList: memberList,
        currentPage: data.number,
        totalPages: totalPages
      }) 
      
    }
    
    memberList();
    
  }, [isModal]); // isModal -> 모달창이 켜지고 꺼질 때 마다 작동 // 수정 & 삭제 시 맴버 리스트 다시 받아와서 랜더
  
  console.log(pageData) // 필요한 데이터 



  console.log(pageData.memberList)
  console.log(typeof(pageData.memberList))


  

  const memberDetail = (id) => {
    console.log("hhahahahahh")
    console.log(id)

    setMemberId(id)

    setIsModal(true)
  }

  return (
    <>
      <div className='admin-member'>
        <div className='admin-member-con'>
          {isModal && <MemberModalA memberId={memberId} setIsModal={setIsModal}/>}

          <ul>
            {pageData.memberList && Object.values(pageData.memberList).map(el => {
              
              return(
                <li>
                  <div className='member-pocket'>

                    <div className='member-pocket-top'>
                      <h1 className='member-pocket-name'>{el.userName}</h1>
                    </div>

                    <div className='member-pocket-bottom'>
                      <h1 className='member-pocket-img'>
                        {el.attachFile ? 
                          <div onClick={() => {memberDetail(el.id)}}>
                            <img src={`http://localhost:8090/member/profile/${el.newImgName}`} alt='image'></img>
                            {/* <img src={`http://192.168.23.231:8090/member/profile/${el.newImgName}`} alt='image'></img> */}
                          </div> :
                          <div onClick={() => {memberDetail(el.id)}}>
                            <img src={`https://place-hold.it/300x300/666/fff/000?text= no Image`}></img>
                          </div>
                        }
                      </h1>
                    </div>
                  </div>
                 
                </li>
              )
            })}

          </ul>
          
        
          <div className="paging">
            <Paging startPage={pageData.startPage} endPage={pageData.endPage} currentPage={pageData.currentPage} totalPages={pageData.totalPages} setPageData={setPageData}/>
          </div>

        </div>
      </div>
    </>
  )
}

export default Member