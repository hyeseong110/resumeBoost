import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtAxios from "./../../util/jwtUtils"
import { useSelector } from 'react-redux';


const Board = () => {
  const isLogin = useSelector((state) => state.loginSlice);
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [startPage, setStartPage] = useState(1)
  const [endPage, setEndPage] = useState(1)
  const [category, setCategory] = useState("all")
  const [searchParams, setSearchParams] = useState({
    subject: "",
    search: "",
  })
  const [memberInfo, setMemberInfo] = useState({
    nickName: "",
    age: 0,
    address: "",
    myPostCount: 0,
    myReplyCount: 0,
    newImgName: "",
    attachFile: 0,
  })

  console.log(isLogin);
  

  // 게시글 목록 조회 함수
  const fetchPosts = async (page = 0) => {
    try {
      let url = "http://localhost:8090/board/boardList"

      // 카테고리별 엔드포인트 설정
      switch (category) {
        case "letter":
          url = "http://localhost:8090/board/boardList/letter"
          break
        case "resume":
          url = "http://localhost:8090/board/boardList/resume"
          break
        case "interview":
          url = "http://localhost:8090/board/boardList/interview"
          break
        case "freedom":
          url = "http://localhost:8090/board/boardList/freedom"
          break
        default:
          url = "http://localhost:8090/board/boardList"
      }

      const response = await axios.get(url, {
        params: {
          page,
          size: 5,
          sort: "id,DESC",
          subject: searchParams.subject,
          search: searchParams.search,
        },
      })
      console.log(response.data.boardList);

      const { boardList, startPage: start, endPage: end } = response.data
      setPosts(boardList.content)
      setTotalPages(boardList.totalPages)
      setStartPage(start)
      setEndPage(end)
      setCurrentPage(page)
    } catch (error) {
      console.error("게시글 조회 중 오류 발생:", error)
    }
  }

  // 검색 처리
  const handleSearch = () => {
    fetchPosts(0)
  }

  // 카테고리 변경 처리
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory)
    setCurrentPage(0)
    setSearchParams({ subject: "", search: "" })
    setPosts([]);  // 기존 게시글 초기화
  }

  // 멤버 정보 조회
  const fetchMemberInfo = async (id) => {
    try {
      const member = await jwtAxios.get(`http://localhost:8090/member/memberDetail/${id}`)
      // console.log(member.data.member);
      setMemberInfo({
        nickName: member.data.member.nickName,
        age: member.data.member.age,
        address: member.data.member.address,
        myPostCount: member.data.member.myPostCount,
        myReplyCount: member.data.member.myReplyCount,
        newImgName: member.data.member.newImgName,
        attachFile: member.data.member.attachFile,
      })
    } catch (error) {
      console.error("멤버 정보 조회 중 오류 발생:", error)
    }
  }

  // 초기 데이터 로드
  useEffect(() => {
    if(isLogin === null){
      return
    }
    fetchMemberInfo(isLogin.id)
  }, [])
  
  // 카테고리나 페이지 변경 시 게시글 조회
  useEffect(() => {
    fetchPosts(currentPage)
  }, [category, currentPage, searchParams])

  // LocalDateTime 포맷팅 함수
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

  const navigate = useNavigate();

  const boardDetailFn=(id)=>{
    if(isLogin===null){
      window.confirm("로그인하세요");
    }else{
      navigate(`/board/detail/${id}`)
    }
  }

  return (
    <div className="board-container">
      <div className="top">
        <div className="top-con">
          <Link to="/board">자유 게시판</Link>
          <Link to="/board/my">내 활동</Link>
        </div>
      </div>

      <div className="container">
        {/* 왼쪽 프로필 영역 */}
        <div className="left">
          {!isLogin.id?(
            <div className="left-noLogin">
              <div className="left-login">
                <Link to={"/auth/login"}>로그인</Link>
              </div>
              <div className="left-join">
                <Link to={"/auth/join"}>회원가입</Link>
              </div>
            </div>
          ):(
            <div className="left-con">
              {memberInfo.attachFile==1?(
                <img
                  src={`http://localhost:8090/member/profile/${memberInfo.newImgName}`}
                  alt="프로필 사진"
                  className="profile"
                  />
                ):( 
                  <img
                  src="data:image/png;base64,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"
                  alt="프로필 사진"
                  className="profile"
                  />
                )}
              <h2 className="nickName">{memberInfo.nickName}님</h2>
              <div className="age-address">
                <div className="age">{memberInfo.age}대</div>
                <span className="vertical1"></span>
                <div className="address">{memberInfo.address}</div>
              </div>

              <div className="count">
                <div className="first">
                  <div>작성글</div>
                  <div>{memberInfo.myPostCount}</div>
                </div>
                <span className="vertical"></span>
                <div>
                  <div>댓글</div>
                  <div>{memberInfo.myReplyCount}</div>
                </div>
              </div>

              <div className="button">
                <button>
                  <Link to="/board/write">게시글 작성</Link>
                </button>
              </div>
            </div>
         )}
        </div>
        {/* 오른쪽 게시글 목록 */}
        <div className="right">
          <div className="right-top">
            <div className="right-top-con">
              <div
                onClick={() => handleCategoryChange("all")}
                className={category === "all" ? "active" : ""}
              >
                전체
              </div>
              <div
                onClick={() => handleCategoryChange("freedom")}
                className={category === "freedom" ? "active" : ""}
              >
                자유게시판
              </div>
              <div
                onClick={() => handleCategoryChange("letter")}
                className={category === "letter" ? "active" : ""}
              >
                자기소개서
              </div>
              <div
                onClick={() => handleCategoryChange("resume")}
                className={category === "resume" ? "active" : ""}
              >
                이력서
              </div>
              <div
                onClick={() => handleCategoryChange("interview")}
                className={category === "interview" ? "active" : ""}
              >
                면접
              </div>
            </div>
            <div className="right-top-search">
              <select
                value={searchParams.subject}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, subject: e.target.value })
                }
              >
                <option value="all">전체</option>
                <option value="title">제목</option>
                <option value="content">내용</option>
                <option value="writer">작성자</option>
              </select>
              <input
                type="text"
                value={searchParams.search}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, search: e.target.value })
                }
                placeholder="검색어 입력"
              />
              <button onClick={handleSearch}>검색</button>
            </div>
          </div>

          <div className="post-list">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="post"
                  onClick={()=>boardDetailFn(post.id)}
                >
                  <div className="post-top">
                    <div className="post-left">
                      <div className="post-header">
                        <span className="post-category">{post.category}</span>
                      </div>
                      <div className="post-title">{post.title}</div>
                      <div className="post-content">
                        {post.content.length > 100
                          ? `${post.content.slice(0, 100)}....`
                          : post.content}
                      </div>
                      {post.content.length > 100 && (
                        <div className="post-readmore">전체보기</div>
                      )}
                    </div>
                    <div className="post-right">
                      {post.attachFile === 1 && (
                        <img
                          src={`http://localhost:8090/board/${post.newImgName}`}
                          alt="첨부 이미지"
                          onError={(e) => {
                            e.target.style.display = "none"
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="post-footer">
                    <div className="post-footer-left">
                      <span className="post-nickName">
                        {post.memberEntity?.nickName}
                      </span>
                      <span className="post-time">
                        {formatRelativeTime(post.createTime)}
                      </span>
                    </div>
                    <div className="post-footer-right">
                      <span>조회 {post.viewCount}</span> |{" "}
                      <span>💬 {post.replyCount}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className='no-board'>게시글이 없습니다.</p>
            )}
          </div>

          {/* 페이지네이션 */}
          <div className="pagination">
            {/* 이전(왼쪽) 버튼 */}
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0} // 첫 페이지일 때 비활성화
            >
              &lt;
            </button>

            {/* 페이지 번호 버튼 */}
            {Array.from(
              { length: endPage - startPage + 1 },
              (_, i) => startPage + i
            ).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page - 1)}
                className={currentPage === page - 1 ? "active" : ""}
              >
                {page}
              </button>
            ))}

            {/* 다음(오른쪽) 버튼 */}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages - 1} // 마지막 페이지일 때 비활성화
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Board;