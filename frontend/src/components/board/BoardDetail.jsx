import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import jwtAxios from '../../util/jwtUtils';
import axios from 'axios';
import { useSelector } from 'react-redux';

const BoardDetail = (param) => {
  const isLogin = useSelector((state) => state.loginSlice);
  const navigate = useNavigate();
  
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [replies, setReplies] = useState([]); // 빈 배열로 초기화
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 로컬 스토리지에서 role 정보를 가져옴
  const [role, setRole] = useState(localStorage.getItem("userRole") || null);
  console.log(role)

  // 로그인 상태가 변경될 때 로컬 스토리지에 role 정보 저장
  useEffect(() => {
    if (isLogin.role && isLogin.role[0]) {
      localStorage.setItem("userRole", isLogin.role[0]);
      setRole(isLogin.role[0]);
    } else {
      localStorage.removeItem("userRole");
      setRole(null);
    }
  }, [isLogin.role]);

  const [boardDetail, setBoardDetail] = useState({
    id: 0,
    attachFile: 0,
    category: "",
    content: "",
    createTime: "",
    memberEntity: {
      nickName: "",
      age: 0,
      address: "",
      attachFile: 0,
      newImgName: "",
      id: null,
    },
    newImgName: "",
    replyCount: 0,
    replyEntities: [],
    title: "",
    viewCount: 0,
  });

  useEffect(() => {
    const detailFn = async () => {
      const boardId = param.param.id;
      const url = `http://localhost:8090/board/detail/${boardId}`
      try {
        const board = await jwtAxios.get(url)
        setBoardDetail({
          id: board.data.boardDetail.id,
          attachFile: board.data.boardDetail.attachFile,
          memberEntity: board.data.boardDetail.memberEntity,
          category: board.data.boardDetail.category,
          content: board.data.boardDetail.content,
          title: board.data.boardDetail.title,
          viewCount: board.data.boardDetail.viewCount,
          createTime: board.data.boardDetail.createTime,
          newImgName: board.data.boardDetail.newImgName,
          replyEntities: board.data.boardDetail.replyEntities,
          replyCount: board.data.boardDetail.replyCount,
        })
      } catch (error) {
        console.log(error);
      }
    }
    detailFn()
  }, [param.param.id])

  useEffect(() => {
    fetchReplies();
  }, [currentPage, param.param.id])

  const fetchReplies = async () => {
    setIsLoading(true);
    const boardId = param.param.id
    const url = `http://localhost:8090/reply/replyList/${boardId}?page=${currentPage}&size=6&sort=id,desc`
    try {
      const response = await jwtAxios.get(url)
      if (response.data && response.data.content) {
        setReplies(response.data.content);
        setTotalPages(response.data.totalPages);
      } else {
        setReplies([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.log(error);
      setReplies([]);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  }

  const handleContentChange = (e) => {
    const value = e.target.value;
    setContent(value);
    if (value.length <= 300) {
      setErrorMessage('');
    } else {
      setErrorMessage('내용은 300자를 넘길 수 없습니다.');
    }
  };

  const handleReplyCountChangePl = () => {
    const replyCount = document.querySelector(".replyCount")
    replyCount.innerText = `💬 ${boardDetail.replyCount +1}`
  }

  const handleSubmitReply = async () => {    
    if (!content.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      await jwtAxios.post('http://localhost:8090/reply/insert', {
        memberId: isLogin.id,
        boardId: param.param.id,
        content: content
      });
      setContent('');
      fetchReplies();
      handleReplyCountChangePl();
    } catch (error) {
      console.log(error);
      alert('댓글 등록에 실패했습니다.');
    }
  };

  const formatRelativeTime = (dateTimeStr) => {
    if (!dateTimeStr) return ""

    const date = new Date(dateTimeStr)
    if (isNaN(date.getTime())) {
      console.error("Invalid date time string:", dateTimeStr)
      return "Invalid Date"
    }

    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) {
      return "방금 전"
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `${diffInHours}시간 전`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) {
      return `${diffInDays}일 전`
    }

    const diffInMonths = Math.floor(diffInDays / 30)
    if (diffInMonths < 12) {
      return `${diffInMonths}개월 전`
    }

    const diffInYears = Math.floor(diffInMonths / 12)
    return `${diffInYears}년 전`
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleReplyCountChange = () => {
    const replyCount = document.querySelector(".replyCount")
    replyCount.innerText = `💬 ${boardDetail.replyCount -1}`
  }

  const deleteReplyFn = async (id) =>{
    const bool = window.confirm("댓글 삭제 하심? 복구 못함")
    if(bool === true){
      try {
        await jwtAxios.delete(`http://localhost:8090/reply/delete/${id}`)
        fetchReplies();
        handleReplyCountChange();
      } catch (error) {
        console.log(error);
        alert('댓글 삭제 실패했습니다.');
      }
    }
    return
  }

  const deleteBoardFn = async (id) =>{
    const bool = window.confirm("게시글 삭제 하심? 복구 못함")
    if(bool === true){
      try {
        await jwtAxios.delete(`http://localhost:8090/board/delete/${id}`)
        navigate("/board")
      } catch (error) {
        console.log(error);
        alert('게시글 삭제 실패했습니다.');
      }
    }
    return
  }

  let isOwnerOrAdmin = isLogin.userEmail === boardDetail.memberEntity.userEmail || role === "ROLE_ADMIN";
  
  return (
    <div className="board-container">
      <div className="top">
        <div className="top-con">
          <Link to="/board">자유 게시판</Link>
          {isLogin.id &&
            <Link to="/board/my">내 활동</Link>
          }
        </div>
      </div>

      <div className="detail-container">
        <div className="back" onClick={()=>navigate("/board")}>
          <div className="back-con">
            <img src="https://kimstudy.com/img/ic24/back.svg" alt="back" />
            <div>목록</div>
          </div>
        </div>
        <div className="detail-top">
          <div className="detail-profile">
            <div className="detail-profile-left">
              {boardDetail.memberEntity.attachFile === 1 ? (
                <img
                  src={`http://localhost:8090/member/profile/${boardDetail.memberEntity.newImgName}`}
                  alt="프로필 사진"
                  className="detail-profile-img"
                />
              ) : (
                <img
                  src="/images/profile.png"
                  alt="프로필 사진"
                  className="detail-profile-img"
                />
              )}
            </div>
            <div className="detail-profile-right">
              <div className="name">{boardDetail.memberEntity.nickName}</div>
              <div className="detail-profile-bottom">
                <div className="detail-bottom">
                  <span>{boardDetail.memberEntity.age}대</span>
                  <span>{boardDetail.memberEntity.address}</span>
                </div>
                <div className="detail-bottom-right">
                {(isLogin.userEmail === boardDetail.memberEntity.userEmail) && (
                  <>
                    {/* 수정 버튼: 본인만 보이게 */}
                    <span onClick={() => navigate(`/board/update/${boardDetail.id}`, { state: { boardDetail } })}>수정</span>
                  </>
                )}
                {/* 삭제 버튼: 본인 또는 ADMIN 역할을 가진 사람만 보이게 */}
                {isOwnerOrAdmin && (
                  <span onClick={() => deleteBoardFn(boardDetail.id)}>삭제</span>
                )}
                </div>
              </div>
            </div>
          </div>
          <div className="detail-main">
            <div className="detail-title">
              <h1>{boardDetail.title}</h1>
            </div>
            <div className="detail-content">
              {boardDetail.content}
            </div>
            {boardDetail.attachFile === 1 && (
              <div className='detail-board-img'>
                <img
                  src={`http://localhost:8090/board/img/${boardDetail.newImgName}`}
                  alt="첨부 이미지"
                  onError={(e) => {
                    e.target.style.display = "none"
                  }}
                />
              </div>
            )}
            <div className="detail-main-footer">
              <div className="detail-main-footer-left">
                <span className="detail-time">
                  {formatRelativeTime(boardDetail.createTime)}
                </span>
              </div>
              <div className="detail-main-footer-right">
                <span>조회 {boardDetail.viewCount}</span>
                <span className='replyCount'>💬 {boardDetail.replyCount}</span>
              </div>
            </div>
          </div>
          
          <div className="detail-footer">
            <div className="detail-reply">
              <div className="detail-reply-header">
                <div>댓글 입력</div>
                <textarea
                  id="reply-content"
                  value={content}
                  onChange={handleContentChange}
                  required
                  placeholder='댓글을 입력해 주세요'
                />
                <div className="reply-button">
                  {errorMessage && <div className="error-message">{errorMessage}</div>}
                  <div className="reply-button-right">
                    <button
                      type='button'
                      onClick={handleSubmitReply}
                      disabled={!content.trim() || content.length > 300}
                    >
                      등록
                    </button>
                  </div>
                </div>
              </div>

              <div className="detail-reply-list">
                {isLoading ? (
                  <div className="loading">댓글을 불러오는 중...</div>
                ) : replies.length > 0 ? (
                  replies.map((reply) => (
                    <div key={reply.id} className="reply-item">
                      <div className="reply-profile">
                        {reply.memberEntity?.attachFile === 1 ? (
                          <img
                            src={`http://localhost:8090/member/profile/${reply.memberEntity.newImgName}`}
                            alt="프로필 사진"
                            className="reply-profile-img"
                          />
                        ) : (
                          <img
                            src="data:image/png;base64,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"
                            alt="프로필 사진"
                            className="reply-profile-img"
                          />
                        )}
                        <div className="reply-info">
                          <div className="reply-author">{reply.memberEntity?.nickName}</div>
                          <div className="reply-metadata">
                            <span>{reply.memberEntity?.age}대</span>
                            <span>{reply.memberEntity?.address}</span>
                            <span>{formatRelativeTime(reply.createTime)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="reply-bottom">
                        <div className="reply-content">{reply.content}</div>
                        {(isLogin.userEmail === reply.memberEntity.userEmail || role === "ROLE_ADMIN")  ?(
                          <div className="reply-delete" onClick={()=>deleteReplyFn(reply.id)}>삭제</div>
                        ):(
                          <></>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-replies">작성된 댓글이 없습니다.</div>
                )}

                {totalPages > 1 && (
                  <div className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={currentPage === i ? 'active' : ''}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoardDetail;