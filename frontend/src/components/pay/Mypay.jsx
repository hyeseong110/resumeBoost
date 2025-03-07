import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import jwtAxios from "../../util/jwtUtils"

const Mypay = () => {
  const param = useParams()
  const id = param.id

  const myPayFn = async () => {
    try {
      const res = await jwtAxios.get(`http://localhost:8090/pay/myPay/${id}`)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    myPayFn()
  }, [id])

  return <div>결제됨</div>
}

export default Mypay
