import React, { Suspense } from 'react'
import {createBrowserRouter} from "react-router-dom";
import DefaultLayout from '../layouts/basic/DefaultLayout';
import MainPage from '../pages/basic/MainPage';
import JoinPage from '../pages/auth/JoinPage';
import JoinTPage from '../pages/auth/JoinTPage';
import IndexPage from '../pages/IndexPage';


const Loading = <div className='loading'>Loading...</div>;

const root = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={Loading}>
        <IndexPage/> {/* 시작 페이지 */}
      </Suspense>
    ),
    children: [
      {
        path: "/join",
        element: (
          <Suspense fallback={Loading}>
            <JoinPage/>
          </Suspense>
        )
      }
      ,
      {
        path: "joinT",
        element: (
          <Suspense fallback={Loading}>
            <JoinTPage/>
          </Suspense>
        )
      }
    ]
  }
  ,
  {
    path: "/index",
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
            <MainPage/>
          </Suspense>
        )
      }
    ]
  }

])

export default root