import React, { Suspense } from 'react'
import {createBrowserRouter} from "react-router-dom";
import DefaultLayout from '../layouts/basic/DefaultLayout';
import IndexPage from '../pages/IndexPage';
import toMainRouter from './toMainRouter';


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
    path: "/index",
    element: (
      <Suspense fallback={Loading}> 
         <DefaultLayout/> {/* 메인 페이지  */}
      </Suspense>
    ),
    children: toMainRouter()
  }

])

export default root