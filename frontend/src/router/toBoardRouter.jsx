import React, { Suspense } from 'react'
import BoardPage from '../pages/board/BoardPage';
import BoardWritePage from '../pages/board/BoardWritePage';
import BoardDetailPage from '../pages/board/BoardDetailPage';
import BoardUpdatePage from '../pages/board/BoardUpdatePage';
import BoardMyPage from '../pages/board/BoardMyPage';


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
      },
      {
        path: "detail/:id",
        element:(
          <Suspense fallback={Loading}>
            <BoardDetailPage />
          </Suspense>
        )
      },
      {
        path: "update/:id",
        element:(
          <Suspense fallback={Loading}>
            <BoardUpdatePage />
          </Suspense>
        )
      },
      {
        path: "my",
        element:(
          <Suspense fallback={Loading}>
            <BoardMyPage />
          </Suspense>
        )
      }
    ]
  )
}

export default toBoardRouter