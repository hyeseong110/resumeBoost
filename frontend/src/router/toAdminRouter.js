import React, { Suspense } from 'react'
import IndexPage from '../pages/admin/IndexPage';
import MemberPage from '../pages/admin/MemberPage';

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
      }
    ]
  )
}

export default toAdminRouter