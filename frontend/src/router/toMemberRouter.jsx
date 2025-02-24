import React, { Suspense } from "react"
import MemberDetailPage from "../pages/member/MemberDetailPage"
import MentorDetailPage from "./../pages/member/MentorDetailPage"
import Index from "../components/member/Index"
import MentorListPage from "./../pages/member/MentorListPage"

const Loading = <div className='loading'>Loading...</div>

const toMemberRouter = () => {
  return [
    {
      path: "",
      element: (
        <Suspense fallback={Loading}>
          <Index />
        </Suspense>
      ),
    },
    {
      path: "memberDetail",
      element: (
        <Suspense fallback={Loading}>
          <MemberDetailPage />
        </Suspense>
      ),
    },
    {
      path: "mentorDetail/:id",
      element: (
        <Suspense fallback={Loading}>
          <MentorDetailPage />
        </Suspense>
      ),
    },
    {
      path: "mentorList",
      element: (
        <Suspense fallback={Loading}>
          <MentorListPage />
        </Suspense>
      ),
    },
  ]
}

export default toMemberRouter
