import React, { Suspense } from 'react'
import BoardPage from '../pages/board/BoardPage';
import BoardWritePage from '../pages/board/BoardWritePage';


const Loading = <div className='loading'>Loading...</div>;

const toBoardRouter = () => {
  return (
    [
      {
        path: "",
        element: (
          <Suspense fallback={Loading}>
            <BoardPage />
          </Suspense>
        )
      },
      {
        path: "write",
        element:(
          <Suspense fallback={Loading}>
            <BoardWritePage />
          </Suspense>
        )
      }
    ]
  )
}

export default toBoardRouter