import React, { Suspense } from 'react'
import IndexPage from '../pages/basic/IndexPage';
import JoinPage from '../pages/auth/JoinPage';
import JoinTPage from '../pages/auth/JoinTPage';
import DetailPage from '../pages/basic/DetailPage';

const Loading = <div className='loading'>Loading...</div>;

const toIndexRouter = () => {
  return (
    [
      {
        path: "",
        element: (
          <Suspense fallback={Loading}>
            <IndexPage/>
          </Suspense>
        )
      },
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
      },
      {
        path: "detail",
        element: (
          <Suspense fallback={Loading}>
            <DetailPage/>
          </Suspense>
        )
      }
    ]
  )
}

export default toIndexRouter