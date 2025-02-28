import React, { Suspense } from "react"
import MemberDetailPage from "../pages/member/MemberDetailPage"
import MentorDetailPage from "./../pages/member/MentorDetailPage"
import Index from "../components/member/Index"
import MentorListPage from "./../pages/member/MentorListPage"
import KakaoRedirectPage from "../components/member/KakaoRedirectPage"
import KakaoModify from "../components/member/KakaoModify"
import ModifyDetailPage from "../pages/member/ModifyDetailPage"

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
      path: "memberDetail/:id",
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
    {
      path: "kakao",
      element: (
        <Suspense fallback={Loading}>
          <KakaoRedirectPage />
        </Suspense>
      ),
    },
    {
      path: "modify",
      element: (
        <Suspense fallback={Loading}>
          <KakaoModify />
        </Suspense>
      ),
    },
    {
      path: "modifyDetail/:id",
      element: (
        <Suspense fallback={Loading}>
          <ModifyDetailPage />
        </Suspense>
      ),
    },
  ]
}

export default toMemberRouter
