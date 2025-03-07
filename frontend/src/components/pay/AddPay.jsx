import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import "../../css/pay/addPay.css"
import jwtAxios from "../../util/jwtUtils"
import { clearCart } from "../../slice/cartSlice"

const AddPay = () => {
  const param = useParams()
  const id = param.id
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search) // URL에서 쿼리 파라미터를 가져옵니다.
  const cartId = queryParams.get("cartId")
  const [step, setStep] = useState(1) // 현재 결제 단계
  const [member, setMember] = useState({})
  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    phone: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("")

  const items = useSelector((state) => state.cartSlice.items)
  const totalPrice = items.reduce((total, item) => total + item.itemPrice, 0)
  const fee = Math.floor(totalPrice * 0.05) // 수수료 5%
  const finalPrice = totalPrice + fee
  const [payData, setPayData] = useState({
    paymentType: "",
    totalPrice: totalPrice,
    memberId: id,
    cartId: cartId,
  })

  const handleNextStep = () => setStep(step + 1)
  const handlePrevStep = () => setStep(step - 1)

  const handlePaymentMethodSelection = (method) => {
    setPaymentMethod(method)
    setPayData({ ...payData, paymentType: method })
  }

  const payMemberFn = async () => {
    try {
      const res = await jwtAxios.get(
        `http://localhost:8090/member/myDetail/${id}`
      )
      setMember(res.data.member)
    } catch (error) {
      console.log(error)
    }
  }

  const addPayFn = async () => {
    let url = ""
    if (paymentMethod === "카드") {
      url = `http://localhost:8090/pay/addPay`
    }
    try {
      const res = await jwtAxios.post(url, payData)
      console.log(res)
      if (res.status === 200) {
        dispatch(clearCart())
        handleNextStep()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    payMemberFn()
  }, [id])

  return (
    <div className='addPay'>
      <div className='payment-container'>
        {step === 1 && (
          <div className='step'>
            <h2>🚚 주문자 정보 확인</h2>
            <input
              type='text'
              placeholder='이름'
              // value={userInfo.name}
              value={member.userName}
              // onChange={(e) =>
              //   setUserInfo({ ...userInfo, name: e.target.value })
              // }
            />
            <input
              type='text'
              placeholder='전화번호'
              value={member.phone}
              // onChange={(e) =>
              //   setUserInfo({ ...userInfo, phone: e.target.value })
              // }
            />
            <input
              type='text'
              placeholder='이메일'
              value={member.userEmail}
              // onChange={(e) =>
              //   setUserInfo({ ...userInfo, address: e.target.value })
              // }
            />
            <button className='next' onClick={handleNextStep}>
              다음
            </button>
          </div>
        )}

        {step === 2 && (
          <div className='step'>
            <h2>결제 방법 선택</h2>
            <button
              className={paymentMethod === "카카오페이" ? "selected" : "howPay"}
              onClick={() => handlePaymentMethodSelection("카카오페이")}
            >
              <img src='/images/kakaoPay.png' alt='' /> <span> 카카오페이</span>
            </button>
            <button
              className={paymentMethod === "카드" ? "selected" : "howPay"}
              onClick={() => handlePaymentMethodSelection("카드")}
            >
              <img src='/images/card.png' alt='' /> <span> 카드결제</span>
            </button>
            <div className='order-summary'>
              <h3 className='summary-title'>최종 결제금액</h3>
              <div className='summary-item'>
                <span>상품가격</span>
                <span>{totalPrice.toLocaleString()}원</span>
              </div>
              <div className='summary-item'>
                <span>수수료 (5%)</span>
                <span>- {fee.toLocaleString()}원</span>
              </div>
              <div className='summary-total'>
                <span>총 결제금액</span>
                <span className='final-price'>
                  {finalPrice.toLocaleString()}원
                </span>
              </div>
            </div>
            <div className='moveBtn'>
              <button onClick={handlePrevStep}>이전</button>
              <button
                onClick={() => {
                  addPayFn()
                }}
                disabled={!paymentMethod}
              >
                결제하기
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className='step'>
            <h2>🎉 결제 완료!</h2>
            <p>{userInfo.name}님, 결제가 완료되었습니다!</p>
            <p>결제 방법: {paymentMethod}</p>
            <button
              className='next'
              onClick={() => navigate(`/pay/myPay/${id}`)}
            >
              내 결제 보기
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddPay
