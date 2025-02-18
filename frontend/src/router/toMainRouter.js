import React, { Suspense } from 'react'
import MainPage from '../pages/basic/MainPage';
import JoinPage from '../pages/auth/JoinPage';
import JoinTPage from '../pages/auth/JoinTPage';


const Loading = <div className='loading'>Loading...</div>;

const toMainRouter = () => {

  return (

    [
      {
        path: "",
        element: (
          <Suspense fallback={Loading}>
            <MainPage/>
          </Suspense>
        )
      },
      {
        path: "join",
        element: (
          <Suspense fallback={Loading}>
            <JoinPage/>
          </Suspense>
        )
      },
      {
        path: "joinT",
        element: (
          <Suspense fallback={Loading}>
            <JoinTPage/>
          </Suspense>
        )
      }
    ]

  )
  


}
  
  
 

export default toMainRouter