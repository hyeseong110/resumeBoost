import React, { Suspense } from 'react'
import IndexPage from '../pages/admin/IndexPage';
import MemberPage from '../pages/admin/MemberPage';
import BoardPage from '../pages/admin/BoardPage';

const Loading = <div className='loading'>Loading...</div>;

const toAdminRouter = () => {
  return(
    [
      {
        path: '',
        element: (
          <Suspense fallback={Loading}>
            <IndexPage/>
          </Suspense>
       )
      },
      {
        path: 'member',
        element: (
          <Suspense fallback={Loading}>
            <MemberPage/>
          </Suspense>
        )
      },
      {
        path: 'board',
        element: (
          <Suspense fallback={Loading}>
            <BoardPage/>
          </Suspense>
        )
      }
    ]
  )
}

export default toAdminRouter