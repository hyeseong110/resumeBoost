import React, { Suspense } from 'react'
import {createBrowserRouter} from "react-router-dom";
import DefaultLayout from '../layouts/basic/DefaultLayout';
import toIndexRouter from './toIndexRouter';

const Loading = <div className='loading'>Loading...</div>;

const root = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={Loading}>
        <DefaultLayout/>
      </Suspense>
    ),
    children: toIndexRouter()
  }

])

export default root