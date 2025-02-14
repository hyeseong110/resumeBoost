import React, { Children, Suspense } from 'react'
import {createBrowserRouter} from "react-router-dom";

const Loading = <div className='loading'>Loading...</div>;

const root = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={Loading}>
      
      </Suspense>
    ),
    children: [
      
    ]

  }

])

export default root