import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import jwtAxios from "../../util/jwtUtils"
import { getCookie } from "../../util/cookieUtil"
import { EC2_URL } from "../../constans"

const ItemDetail = ({ param }) => {
  const navigate = useNavigate()

  // const [loginId, setLoginId] = useState(''); // 로그인한 사람 ID

  const [detail, setDetail] = useState({}) // 멘토
  const [items, setItems] = useState({}) // 아이템
  const [update, setUpdate] = useState({}) // 업데이트

  // 멘토 데이터 가져오기 // 상품 데이터 가져오기
  const detailItem = async (mentorId) => {
    const url = `http://${EC2_URL}:8090/admin/member/detail/${mentorId}`

    const res = await jwtAxios.get(url)

    setDetail(res.data.member)
  }

  const getItems = async (mentorId) => {
    const itemUrl = `http://${EC2_URL}:8090/admin/item/details/${mentorId}`
    const itemRes = await jwtAxios.get(itemUrl)
    setItems(itemRes.data.item)
  }

  useEffect(() => {
    detailItem(param)

    getItems(param)

    // const cookie = getCookie("member");

    // setLoginId(cookie.id);
  }, [])

  // 상품 삭제
  const deleteItem = async (itemId) => {
    const isDelete = window.confirm("상품을 수정하시겠습니끼?")
    if (!isDelete) {
      return
    }

    const url = `http://${EC2_URL}:8090/admin/item/delete/${itemId}`

    await jwtAxios.delete(url)

    getItems(param)
  }

  // 수정할 값 state 에 저장
  const handleChange = (e, itemId) => {
    const data = Object.values(items).filter((el) => el.id === itemId)[0]

    data[e.target.name] = e.target.value

    setUpdate(data)
  }

  // 상품 수정
  const itemUpdate = async (itemId) => {
    const isUpdate = window.confirm("상품을 수정하시겠습니끼?")
    if (!isUpdate) {
      return
    }

    const url = `http://${EC2_URL}:8090/admin/item/update`
    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    await jwtAxios.put(url, update, header)

    setUpdate({})

    // itemListFn();
  }

  return (
    <div className='admin-item-detail'>
      <div className='admin-item-detail-con'>
        <span
          className='admin-item-detail-back'
          onClick={() => {
            navigate(-1)
          }}
        >
          뒤로가기
        </span>

        <h1>item detail</h1>

        <div className='admin-item-detail-wrap'>
          <div className='admin-item-detail-left'>
            <ul>
              <li>
                <h3>{detail.nickName}</h3>
              </li>

              <li>{detail.userName}</li>
              <li>{detail.id}</li>
              <li>{detail.career}</li>
              <li>{detail.address}</li>
              <li>{detail.phone}</li>
              <li>{detail.age}</li>
              <li>{detail.userEmail}</li>
            </ul>

            <div className='admin-item-detail-img'>
              <h1>
                {detail.attachFile ? (
                  <div className='mentor-img'>
                    <img
                      src={`http://${EC2_URL}:8090/member/profile/${detail.newImgName}`}
                      alt='image'
                    ></img>
                  </div>
                ) : (
                  <div className='mentor-img'>
                    <img
                      src={`https://place-hold.it/200x200/666/fff/000?text= no Image`}
                    ></img>
                  </div>
                )}
              </h1>
            </div>
          </div>

          <div className='admin-item-detail-right'>
            <div className='item-list'>
              {items &&
                Object.values(items).map((el, idx) => {
                  return (
                    <div className='item-pocket'>
                      <ul>
                        <li>
                          <label htmlFor='id'>상품ID</label>
                          <input
                            type='text'
                            name='id'
                            id='id'
                            defaultValue={el.id}
                            readOnly
                          />
                        </li>
                        <li>
                          <label htmlFor='memberId'>멘토ID</label>
                          <input
                            type='text'
                            name='memberId'
                            id='memberId'
                            defaultValue={el.memberId}
                            onChange={(e) => {
                              handleChange(e, el.id)
                            }}
                          />
                        </li>
                        <li>
                          <label htmlFor='category'>카테고리</label>
                          <input
                            type='text'
                            name='category'
                            id='category'
                            defaultValue={el.category}
                            onChange={(e) => {
                              handleChange(e, el.id)
                            }}
                          />
                        </li>
                        <li>
                          <label htmlFor='itemPrice'>상품가격</label>
                          <input
                            type='text'
                            name='itemPrice'
                            id='itemPrice'
                            defaultValue={el.itemPrice}
                            onChange={(e) => {
                              handleChange(e, el.id)
                            }}
                          />
                        </li>
                        <li>
                          <span>{el.createTime}</span>
                          <span>{el.updateTime}</span>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              itemUpdate(el.id)
                            }}
                          >
                            수정하기
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              deleteItem(el.id)
                            }}
                          >
                            삭제하기
                          </button>
                        </li>
                      </ul>
                    </div>
                  )
                })}

              {items && Object.values(items).length === 0 && (
                <h1>상품이 존재하지 않습니다.</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemDetail
