import React from "react"
import axios from "axios"

export const loginPost = async (loginParam) => {
  const header = { headers: { "Content-Type": "x-www-form-urlencoded" } }

  const form = new FormData()
  form.append("userEmail", loginParam.userEmail)
  form.append("userPw", loginParam.userPw)

  const res = await axios.post(
    "http://localhost:8090/member/login",
    form,
    header
  )

  return res.data
}
