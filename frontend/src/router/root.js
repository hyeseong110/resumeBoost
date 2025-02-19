import React, { lazy, Suspense } from 'react'
import {createBrowserRouter} from "react-router-dom";
import DefaultLayout from '../layouts/basic/DefaultLayout';
import IndexPage from '../pages/IndexPage';
import toBoardRouter from './toBoardRouter';
import toAuthRouter from './toAuthRouter';
import AuthLayout from '../layouts/auth/AuthLayout';

const MainPage = lazy(() => import("../pages/basic/MainPage"));

const Loading = <div className='loading'>Loading...</div>;

const root = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={Loading}>
        <IndexPage/> {/* 시작 페이지 */}
      </Suspense>
    )
  }
  ,
  {
    path: "/main",
    element: (
      <Suspense fallback={Loading}> 
         <DefaultLayout/> {/* 메인 페이지  */}
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={Loading}>
            <MainPage />
          </Suspense>
        )
      }
    ]
  }
  ,
  {
    path: "/board",
    element: (
      <Suspense fallback={Loading}>
        <DefaultLayout/>
      </Suspense>
    ),
    children: toBoardRouter()
  },
  {
    path: '/auth',
    element: (
      <Suspense fallback={Loading}>
        <AuthLayout />
      </Suspense>
    ),
    children: toAuthRouter()
  }

])

export default root