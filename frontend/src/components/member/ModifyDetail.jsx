import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import jwtAxios from "../../util/jwtUtils"

const ModifyDetail = () => {
  const param = useParams()
  const myId = param.id
  const [member, setMember] = useState("")

  const detailAxiosFn = async (myId) => {
    try {
      const result = await jwtAxios.get(
        `http://localhost:8090/member/myDetail/${myId}`
      )
      setMember(result.data.member)
    } catch (err) {
      console.log(err)
    }
  }
  console.log(member)

  useEffect(() => {
    detailAxiosFn(param.id)
  }, [])

  return <div>ModifyDetail</div>
}

export default ModifyDetail
