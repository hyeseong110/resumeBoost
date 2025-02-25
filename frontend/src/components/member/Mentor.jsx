import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import jwtAxios from "./../../util/jwtUtils"
import { useSelector } from "react-redux"
import loginSlice from "./../../slice/loginSlice"

const Mentor = () => {
  const param = useParams()
  const loginState = useSelector((state) => state.loginSlice)
  const mentorId = param.id
  const [mentor, setMentor] = useState("")
  const [category, setCategory] = useState([])

  const mentorAxiosFn = async (mentorId) => {
    try {
      const result = await jwtAxios.get(
        `http://localhost:8090/member/mentorDetail/${mentorId}/${loginState.id}`
      )
      setMentor(result.data.mentor)
      setCategory(
        Array.from(
          new Set(result.data.mentor.itemEntities.map((item) => item.category))
        )
      )
    } catch (err) {
      console.log(err)
    }
  }
  console.log(mentor)

  // const categories = Array.from(
  // new Set(mentor.itemEntities.map((item) => item.category))
  // )

  console.log(category)
  useEffect(() => {
    mentorAxiosFn(param.id)
  }, [])

  return (
    <div className='mentorDetail'>
      <div className='profileDiv'>
        <div className='profileImg'></div>
      </div>
      <div className='imgThum'>
        <img src='/images/mentor.jpg' alt='mentor' />
      </div>
      <div className='mentorDetail-con'>
        <div className='mentor-detail'>
          <h1>{mentor.nickName}</h1>
          <div>
            {category.map((e) => (
              <span>{e} / </span>
            ))}
          </div>
          <span>경력 : {mentor.career}</span>
          <div className='mentorInfo'>
            <ul>
              <li>멘토 정보</li>
              <li>멘토의 상품</li>
              <li>포트폴리오</li>
              <li>사진/동영상</li>
              <li>리뷰</li>
            </ul>
            <div className='mentorDetails'></div>
            <div className='mentorItems'></div>
            <div className='mentorPortfolios'></div>
            <div className='mentorImg'></div>
            <div className='mentorReview'></div>
          </div>
        </div>
        <div className='mentor-pay'>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Mentor
