import React, { useEffect, useState } from 'react'
import jwtAxios from '../../util/jwtUtils'
import Paging from './paging/Paging';

const Board = () => {

  const [pageData, setPageData] = useState({}); // board list
  const [result, setResult] = useState({}); // 상세 조회 결과


  const boardList = async () => {

    const res = await jwtAxios.get(`http://localhost:8090/admin/board`);
    
    console.log(res.data);

    const data = res.data.board; // 받은 모든 데이터

    // 페이징 메서드 
    const currentPage = data.number;
    const totalPages = data.totalPages;
    const blockNum = 3;

    const boardList = data.content;
    
    const startPage = ((Math.floor(currentPage/blockNum) * blockNum) + 1 <= totalPages ? (Math.floor(currentPage/blockNum) * blockNum) + 1 : totalPages);
    const endPage = (startPage + blockNum) - 1 < totalPages ? (startPage + blockNum) - 1 : totalPages;

    setPageData({
      startPage: startPage,
      endPage: endPage,
      boardList: boardList,
      currentPage: data.number,
      totalPages: totalPages
    })

  }


  useEffect(() => {

    boardList()

  }, [])


  console.log(pageData) // 필요한 데이터


  const boardDetailFn = async (boardId) => {
    
    const res = await jwtAxios.get(`http://localhost:8090/admin/board/detail/${boardId}`);

    const data = res.data.board;

    console.log(data)

    setResult(data);

    
  }

  const boardDeleteFn = async (boardId) => {

    const isDelete = window.confirm("게시글을 삭제하시겠습니까?")

    if (!isDelete) {
      return
    }

    await jwtAxios.delete(`http://localhost:8090/admin/board/delete/${boardId}`); // 게시글 삭제

    console.log("delete Ok")
    
    setResult({}); // 상세 정보 초기화

    boardList(); // 최신 상태 다시 가져와서 랜더

  }


  // 수정 -> 변경 값 저장
  const handleChange = (e) => {
    
    result[e.target.name] = e.target.value
    console.log(result)
    setResult({
      ...result
    })

  }


  // 파일 담기
  const handleFile = (e) => {
    
    console.log(e.target.files[0])

    const file = e.target.files[0]

    result[e.target.name] = file
    
    setResult({
      ...result
    })

  }

  const boardUpdateFn = async () => {

    console.log(result)

    const boardId = result.id;

    const isUdate  = window.confirm("회원정보를 수정하시겠습니까?")

    if (!isUdate) {
      return 
    }

    const form = new FormData();

    form.append("id", result.id)
    form.append("title", result.title)
    form.append("content", result.content)
    form.append("category", result.category)
    form.append("viewCount", result.viewCount)
    form.append("attachFile", result.attachFile)
    form.append("memberId", result.memberId)
    form.append("replyCount", result.replyCount)
    form.append("writer", result.writer)

    if (result.boardImgFile !== null) {
      form.append("boardImgFile", result.boardImgFile)
    }

    await jwtAxios.put(`http://localhost:8090/admin/board/update`, form, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    boardList(); // 최신 상태 다시 가져와서 랜더

    boardDetailFn(boardId); // 상세 정보 창도 업데이트 상태로 최신화
  }

  

  return (
    <>
      <div className='admin-board'>
        <div className='admin-board-con'>
          
          <div className='admin-board-left'>
            <div className='admin-board-left-header'>
              <ul>
                <li>게시글 ID</li>
                <li>작성자 ID</li>
                <li>제목</li>
                <li>카테고리</li>
                <li>조회수</li>
                <li>덧글수</li>
                <li>파일유무</li>
              </ul>
            </div>

            {pageData.boardList && Object.values(pageData.boardList).map((el, idx) => {
              return(
                <div className='board-pocket' key={idx} onClick={() => {boardDetailFn(el.id)}}>
                  <ul>
                    <li>{el.id}</li>
                    <li>{el.memberId}</li>
                    <li>{el.title}</li>
                    <li>{el.category}</li>
                    <li>{el.viewCount}</li>
                    <li>{el.replyCount}</li>
                    <li>{el.attachFile}</li>
                  </ul>
                </div>
              )
            })}
              
            <div className='paging'>
              <Paging startPage={pageData.startPage} endPage={pageData.endPage} currentPage={pageData.currentPage} totalPages={pageData.totalPages} setPageData={setPageData}/>
            </div>
          </div>
          <div className='admin-board-right'>
            <div className='admin-board-result'>
              {result && 
              <form>
                <ul>
                  <li>
                    <label htmlFor="id">게시글 ID</label>
                    <input type="text" name="id" id="id" defaultValue={result.id} readOnly/>
                  </li>
                  <li>
                    <label htmlFor="title">제목</label>
                    <input type="text" name="title" id="title" defaultValue={result.title} onChange={handleChange}/>
                  </li>
                  <li>
                    <label htmlFor="content">내용</label>
                    <textarea id='content' defaultValue={result.content} onChange={handleChange}></textarea> {/* textarea 글 작성 칸 */}
                  </li>
                  <li>
                    <label htmlFor="category">카테고리</label>
                    <input type="text" name="category" id="category" defaultValue={result.category} onChange={handleChange}/>
                  </li>
                  <li>
                    <label htmlFor="viewCount">조회수</label>
                    <input type="text" name="viewCount" id="viewCount" defaultValue={result.viewCount} readOnly/>
                  </li>
                  <li>
                    <label htmlFor="attachFile">파일유무</label>
                    <input type="text" name="attachFile" id="attachFile" defaultValue={result.attachFile} readOnly/>
                  </li>
                  <li>
                    <label htmlFor="memberId">작성자 ID</label>
                    <input type="text" name="memberId" id="memberId" defaultValue={result.memberId} readOnly/>
                  </li>
                  <li>
                    <label htmlFor="replyCount">덧글 수 </label>
                    <input type="text" name="replyCount" id="replyCount" defaultValue={result.replyCount} readOnly/>
                  </li>
                  <li>
                    <label htmlFor="boardImgFile">게시글 사진</label>
                    <input type="file" name="boardImgFile" id="boardImgFile" onChange={handleFile}/>
                  </li>
                  <li>
                    <label htmlFor="writer">writer</label>
                    <input type="text" name="writer" id="writer" defaultValue={result.writer} readOnly/>
                  </li>
                  <li>
                    {result.attachFile ?
                      <div className='admin-board-img'>
                        <img src={`http://localhost:8090/board/${result.newImgName}`} alt='image'></img>
                      </div> :
                      <div>
                        <img src={`https://place-hold.it/150x150/666/fff/000?text= no Image`}></img>
                      </div>
                    }
                    <img></img>
                  </li>
                  <li>
                    <span onClick={() => {boardUpdateFn()}}>수정</span>
                    <span onClick={() => {boardDeleteFn(result.id)}}>삭제</span>
                  </li>
                </ul>
              </form>
              }
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Board