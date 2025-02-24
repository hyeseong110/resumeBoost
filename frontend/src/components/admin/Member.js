import axios from 'axios'
import React, { useEffect, useState } from 'react'
import jwtAxios from '../../util/jwtUtils'
import { Link } from 'react-router-dom';
import MemberModalA from './modal/MemberModalA';
import Paging from './paging/Paging';

const Member = () => {


  

  const [pageData, setPageData] = useState({});


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
    
  }, []);
  
  console.log(pageData) // 필요한 데이터 


  // 해당 page memberList 가져오기
  // const getPage = async (index) => {
  //   const res = await jwtAxios.get(`http://localhost:8090/admin/member?page=${index - 1}`);

  //   console.log(res.data);

  // }


  // 페이징 버튼 <li></li>
  // const pagingBar = () => {
        
  //   let arr = []

  //   for (let i = pageData.startPage; i <= pageData.endPage; i++) {
      
  //     arr.push(
  //       <li>
  //         {i == pageData.currentPage + 1 ? 
  //         <span>{i}</span> : 
  //         <span onClick={async () => {
  //           const res = await jwtAxios.get(`http://localhost:8090/admin/member?page=${i - 1}`);

  //           console.log(res.data);
  //         }}>{i}</span>}
  //       </li>
  //     )

  //   }
    
  //   return arr;
  // }     


  console.log(pageData.memberList)
  console.log(typeof(pageData.memberList))

  // 모달 
  const [isModal, setIsModal] = useState(false)
  const [memberId, setMemberId] = useState("")
  

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
                        {el.newImgName ? 
                          <div onClick={() => {memberDetail(el.id)}}>
                            <img src={`http://192.168.23.231:8090/member/profile/${el.newImgName}`} alt='image'></img> 
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


            {/* {pageData && Object.values(pageData.memberList).map(el => {
              <li>
                <div className='member-pocket'>
                  <div className='member-pocket-top'>
                    <span>
                      {el.userName}
                    </span>
                  </div>
                  <div className='member-pocket-bottom'>
                    <div className='member-pocket-img'>
                      <img src={`http://localhost:8090/member/profile/${el.nickName}`} alt="" />
                    </div>
                  </div>
                </div>
              </li>
            })} */}
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