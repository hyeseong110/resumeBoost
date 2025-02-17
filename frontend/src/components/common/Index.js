import React from 'react'
import { Link } from 'react-router-dom'



const Index = () => {
  return (
    <>
      <Link to={'/join'}>회원가입</Link> <br/>
      <Link to={'/joinT'}>멘토 회원가입</Link>
      
      
      <br/>
      <br/>
      <br/>
      <Link to={'/detail'}>둘러보기</Link>
    </>
  )
}

export default Index