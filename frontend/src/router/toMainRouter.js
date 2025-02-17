import React, { Suspense } from 'react'


const Loading = <div className='loading'>Loading...</div>;

const toMainRouter = () => {
  return (
    [
      {
        path: "",
        element: (
          <Suspense fallback={Loading}>

          </Suspense>
        )
      }
    ]
  )
}

export default toMainRouter