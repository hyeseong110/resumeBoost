import React, { Suspense } from 'react'
import IndexPage from '../pages/admin/IndexPage';
import MemberPage from '../pages/admin/MemberPage';
import BoardPage from '../pages/admin/BoardPage';
import BoardDetailPage from '../pages/admin/BoardDetailPage';
import ItemPage from '../pages/admin/ItemPage';
import ItemDetailPage from '../pages/admin/ItemDetailPage';
import CartPage from '../pages/admin/CartPage';
import CartDetailPage from '../pages/admin/CartDetailPage';

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
      },
      {
        path: 'board/detail/:id',
        element: (
          <Suspense fallback={Loading}>
            <BoardDetailPage/>
          </Suspense>
        )
      },
      {
        path: 'item',
        element: (
          <Suspense fallback={Loading}>
            <ItemPage/>
          </Suspense>
        )
      },
      {
        path: 'item/detail/:id',
        element: (
          <Suspense fallback={Loading}>
            <ItemDetailPage/>
          </Suspense>
        )
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback={Loading}>
            <CartPage/>
          </Suspense>
        )
      },
      {
        path: 'cart/detail/:id',
        element: (
          <Suspense fallback={Loading}>
            <CartDetailPage/>
          </Suspense>
        )
      }
    ]
  )
}

export default toAdminRouter