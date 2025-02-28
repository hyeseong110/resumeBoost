import React from "react"
import { useParams } from "react-router-dom"
import ModifyDetail from "../../components/member/ModifyDetail"

const ModifyDetailPage = () => {
  const param = useParams()
  return (
    <>
      <ModifyDetail param={param} />
    </>
  )
}

export default ModifyDetailPage
