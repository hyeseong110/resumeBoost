import React, { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import jwtAxios from "./../../util/jwtUtils"
import { useSelector } from "react-redux"

const Mentor = () => {
  const { id: mentorId } = useParams()
  const loginState = useSelector((state) => state.loginSlice)
  const [mentor, setMentor] = useState({})
  const [items, setItems] = useState([])
  const [category, setCategory] = useState([])
  const [imgUrl, setImgUrl] = useState("/images/mentor.jpg")
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRefs = useRef([])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionRefs.current.indexOf(entry.target)
          setActiveIndex(index)
        }
      })
    }, observerOptions)

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  const handleClick = (index) => {
    setActiveIndex(index)
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }

  const mentorAxiosFn = async (mentorId) => {
    try {
      const result = await jwtAxios.get(
        `http://localhost:8090/member/mentorDetail/${mentorId}/${loginState.id}`
      )
      const mentorData = result.data.mentor
      setMentor(mentorData)
      setCategory(
        Array.from(
          new Set(result.data.mentor.itemEntities.map((item) => item.category))
        )
      )
      if (mentorData.attachFile === 1) {
        setImgUrl(
          `http://localhost:8090/member/profile/${mentorData.newImgName}`
        )
      }
    } catch (err) {
      console.log(err)
    }
  }

  const itemAxiosFn = async (mentorId) => {
    try {
      const result = await jwtAxios.get(
        `http://localhost:8090/item/myItemList/${mentorId}`
      )
      setItems(result.data.itemList.content)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    mentorAxiosFn(mentorId)
    itemAxiosFn(mentorId)
  }, [mentorId])

  return (
    <div className='mentorDetail'>
      <div className='profileDiv' style={{ backgroundImage: `url(${imgUrl})` }}>
        <div className='profileImg'></div>
      </div>
      <div className='imgThum'>
        <img
          src={
            mentor.attachFile === 1
              ? `http://localhost:8090/member/profile/${mentor.newImgName}`
              : "/images/mentor.jpg"
          }
          alt='mentor'
        />
      </div>
      <div className='mentorDetail-con'>
        <div className='mentor-detail'>
          <h1>{mentor.nickName}</h1>
          <div>
            {category.map((e, index) => (
              <span key={index}>
                {e}
                {index !== category.length - 1 && " / "}
              </span>
            ))}
          </div>
          <span>경력 : {mentor.career}</span>

          {/* ✅ 클릭 시 activeIndex 변경 + 스크롤 이동 */}
          <div className='mentorInfo'>
            <ul className='info'>
              {[
                "멘토 정보",
                "멘토의 상품",
                "포트폴리오",
                "사진/동영상",
                "리뷰",
              ].map((text, index) => (
                <li
                  key={index}
                  className={activeIndex === index ? "active" : ""}
                  onClick={() => handleClick(index)}
                >
                  {text}
                </li>
              ))}
            </ul>

            {/* ✅ 해당 div만 보이도록 설정 + ref 연결 */}
            <div
              ref={(el) => (sectionRefs.current[0] = el)}
              className='mentorDetails'
            >
              <h2>멘토 정보</h2>
              <ul>
                <li>이름 : {mentor.userName}</li>
                <li>나이 : {mentor.age}</li>
                <li>경력 : {mentor.career}</li>
              </ul>
            </div>

            <div
              ref={(el) => (sectionRefs.current[1] = el)}
              className='mentorItems'
            >
              <h2>멘토의 상품</h2>
              <ul className='myItemList'>
                {items.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => console.log(`상품 ID: ${item.id}`)}
                  >
                    <p>
                      <span>카테고리:</span> {item.category}
                    </p>
                    <p>{item.itemPrice}원</p>
                  </li>
                ))}
              </ul>
            </div>

            <div
              ref={(el) => (sectionRefs.current[2] = el)}
              className='mentorPortfolios'
            >
              <h2>포트폴리오</h2>
            </div>

            <div
              ref={(el) => (sectionRefs.current[3] = el)}
              className='mentorImg'
            >
              <h2>이미지</h2>
            </div>

            <div
              ref={(el) => (sectionRefs.current[4] = el)}
              className='mentorReview'
            >
              <h2>리뷰/후기</h2>
            </div>
          </div>
        </div>
        <div className='mentor-pay'>
          <div className='mentor-btn1'>상담 요청하기</div>
          <div className='mentor-btn2'>장바구니 담기</div>
        </div>
      </div>
    </div>
  )
}

export default Mentor
