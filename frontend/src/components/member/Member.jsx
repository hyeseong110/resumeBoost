import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import jwtAxios from "./../../util/jwtUtils"
import MyItems from "./../item/MyItems"
import PersonalInfoForm from "./PersonalInfoForm"
import MyBoard from "./MyBoard"
import { S3URL } from "../../util/constant"
import MyReview from "./MyReview"

const Member = () => {
  const param = useParams()
  const myId = param.id
  const [member, setMember] = useState({})
  const loginState = useSelector((state) => state.loginSlice)
  const [role, setRole] = useState(loginState.role?.[0] || "")
  const [selectedMenu, setSelectedMenu] = useState("개인정보") // 기본 선택 값
  const [items, setItems] = useState([])
  const [boardList, setBoardList] = useState([])
  const [category, setCategory] = useState("myBoard")
  const [file, setFile] = useState(null)
  const [imgPreview, setImgPreview] = useState(null)

  const itemAxiosFn = async () => {
    if (items.length > 0) return

    try {
      const result = await jwtAxios.get(
        `http://localhost:8090/item/myItemList/${myId}`
      )
      console.log(result)
      setItems(result.data.itemList.content)
    } catch (err) {
      console.log(err)
    }
  }
  const detailAxiosFn = async () => {
    try {
      const result = await jwtAxios.get(
        `http://localhost:8090/member/myDetail/${myId}`
      )
      const memberRes = result.data.member
      setMember(memberRes)
      if (memberRes.attachFile === 1) {
        setImgPreview(`${S3URL}${memberRes.newImgName}`)
      } else {
        setImgPreview("")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const myBoardFn = async (page = 0) => {
    try {
      let url = ""

      switch (category) {
        case "myBoard":
          url = `http://localhost:8090/board/boardList/my/${myId}`
          break
        case "myReply":
          url = `http://localhost:8090/reply/replyList/my/${myId}`
          break
      }

      const res = await jwtAxios.get(url, {
        params: {
          page,
          size: 5,
          sort: "id,DESC",
        },
      })
      setBoardList(res.data.boardList.content)
      console.log(boardList)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (selectedMenu === "내 상품" && role === "ROLE_MENTOR") {
      itemAxiosFn()
    } else if (selectedMenu === "작성글/댓글") {
      myBoardFn()
    }
  }, [selectedMenu, role, myId, category])

  useEffect(() => {
    detailAxiosFn()
  }, [myId])

  // 클릭 시 선택된 메뉴 변경
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu)
  }

  const renderMenucontent = () => {
    switch (selectedMenu) {
      case "개인정보":
        return (
          <PersonalInfoForm
            member={member}
            setMember={setMember}
            handleSubmit={handleSubmit}
            handleFile={handleFile}
            imgPreview={imgPreview}
          />
        )
      case "내 상품":
        return role === "ROLE_MENTOR" ? (
          <MyItems
            items={items}
            itemAxiosFn={itemAxiosFn}
            setItems={setItems}
          />
        ) : null
      case "구매 내역":
        return role !== "ROLE_MENTOR" ? <p>구매 내역 목록</p> : null
      case "리뷰 목록":
        return (
          <MyReview />
        )
      case "작성글/댓글":
        return (
          <MyBoard
            boardList={boardList}
            setCategory={setCategory}
            category={category}
          />
        )
      default:
        return null
    }
  }

  const handleFile = (e) => {
    const insertFile = e.target.files[0]
    setFile(insertFile)

    if (insertFile) {
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
        setImgPreview(fileReader.result)
      }
      fileReader.readAsDataURL(insertFile)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const postUrl =
      role === "ROLE_MEMBER"
        ? "http://localhost:8090/member/modify"
        : "http://localhost:8090/member/modify/mentor"

    const formData = new FormData()

    Object.keys(member).forEach((key) => {
      if (
        member[key] !== undefined &&
        member[key] !== null &&
        !Array.isArray(member[key])
      ) {
        formData.append(key, member[key])
      }
    })
    if (file) {
      formData.append("profileFile", file)
    }

    try {
      await jwtAxios.post(postUrl, formData)
      alert("수정 성공")
      detailAxiosFn() // 수정 후 회원 정보 다시 불러오기
    } catch (err) {
      alert("수정 실패")
      console.log(err)
    }
  }
  return (
    <div className='memberDetail'>
      <div className='memberDetail-con'>
        <div className='memberProfile'>
          <div className='memberImgAndName'>
            <div className='memberImg'>
              <img
                src={
                  member.attachFile === 1
                    ? `${S3URL}${member.newImgName}`
                    : "/images/profile.png"
                }
                alt='profile'
              />
            </div>
            <div className='memberName'>
              <h3>{member.userName}</h3>
              <div>
                <span>{member.age}대 · </span>
                <span>{member.address}</span>
              </div>
            </div>
          </div>
          <div className='modifyDetail'>
            {/* <div className='myDetailModify'>
              <img src='/images/pencil.png' alt='pencil' />
              <span>내 정보 수정</span>
            </div> */}
            {role === "ROLE_MENTOR" && (
              <div className='myDetailModify'>
                <Link to='/item/insert'>
                  <img src='/images/pencil.png' alt='pencil' />
                  <span>상품 등록</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* 메뉴 리스트 */}
        <div className='myDetail-container'>
          <div className='liDetail'>
            <ul>
              <li
                className={selectedMenu === "개인정보" ? "active" : ""}
                onClick={() => handleMenuClick("개인정보")}
              >
                개인정보
              </li>
              {role === "ROLE_MENTOR" ? (
                <li
                  className={selectedMenu === "내 상품" ? "active" : ""}
                  onClick={() => handleMenuClick("내 상품")}
                >
                  내 상품
                </li>
              ) : (
                <li
                  className={selectedMenu === "구매 내역" ? "active" : ""}
                  onClick={() => handleMenuClick("구매 내역")}
                >
                  구매 내역
                </li>
              )}
              <li
                className={selectedMenu === "리뷰 목록" ? "active" : ""}
                onClick={() => handleMenuClick("리뷰 목록")}
              >
                리뷰 목록
              </li>
              <li
                className={selectedMenu === "작성글/댓글" ? "active" : ""}
                onClick={() => handleMenuClick("작성글/댓글")}
              >
                작성글/댓글
              </li>
            </ul>
          </div>

          {/* 클릭된 메뉴에 따라 내용 변경 */}
          <div className='li-detail'>{renderMenucontent()}</div>
        </div>
      </div>
    </div>
  )
}
export default Member
