import React, { useState } from "react"
import { useSelector } from "react-redux"
import loginSlice from "./../../slice/loginSlice"
import axios from "axios"
import { useEffect } from "react"
import jwtAxios from "./../../util/jwtUtils"
import { useNavigate } from "react-router"

const MentorList = () => {
  const loginState = useSelector((state) => state.loginSlice)
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [startPage, setStartPage] = useState(1)
  const [endPage, setEndPage] = useState(1)
  const [subject, setSubject] = useState("")
  const [search, setSearch] = useState("")
  const [members, setMembers] = useState([])

  const MentorAxiosFn = async (page = 0) => {
    try {
      const url = "http://localhost:8090/member/mentorList"

      const result = await axios.get(url, {
        params: {
          page,
          size: 5,
          sort: "id,ASC",
          subject: subject,
          search: search,
        },
      })
      console.log(result)

      setMembers(result.data.mentorList.content)
      setTotalPages(result.data.mentorList.totalPages)
      setStartPage(result.data.startPage)
      setEndPage(result.data.endPage)
      setCurrentPage(page)
    } catch (err) {
      console.log("멤버 axios 오류", err)
    }
  }

  const mentorDetailFn = (id) => {
    if (loginState.role === null) {
      window.confirm("로그인하세요")
    } else {
      navigate(`/member/mentorDetail/${id}`)
    }
  }

  const searchFn = () => {
    MentorAxiosFn(0)
  }

  useEffect(() => {
    MentorAxiosFn(currentPage)
  }, [currentPage, subject, search])

  return (
    <div className='mentorList'>
      <div className='mentorList-con'>
        <div className='searchDiv'>
          <div className='mentor-search'>
            <span>멘토 검색하기</span>
            <select
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value)
              }}
            >
              <option value='all'>전체</option>
              <option value='address'>주소</option>
              <option value='nickName'>닉네임</option>
            </select>
            <div className='searchBtn'>
              <input
                type='text'
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                }}
                placeholder='검색어 입력'
              />
              <button onClick={searchFn}>
                <img src='/images/search.png' alt='search' />
              </button>
            </div>
          </div>
        </div>
        <div className='mentor-list'>
          {members.length > 0 ? (
            members
              .filter((e) => e.role === "MENTOR")
              .map((member) => (
                <div
                  key={member.id}
                  className='mentor'
                  onClick={() => mentorDetailFn(member.id)}
                >
                  <div className='left'>
                    <img src='/images/profile.png' alt='profile' />
                  </div>
                  <div className='right'>
                    <span className='mentor-nickName'>{member.nickName}</span>
                    <span className='mentor-career'>{member.career}</span>
                    <div className='category'>
                      <span>분야 : </span>
                      {member.itemEntities.map((e) => (
                        <span key={e.id}>{e.category} </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <></>
          )}
        </div>

        <div className='pagination'>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            이전
          </button>
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
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  )
}

export default MentorList
