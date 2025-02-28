import React, { Suspense } from "react"
import ItemPage from "./../pages/item/ItemPage"
import ItemInsertPage from "../pages/item/ItemInsertPage"

const Loading = <div className='loading'>Loading...</div>

const toItemRouter = () => {
  return [
    {
      path: "",
      element: (
        <Suspense fallback={Loading}>
          <ItemPage />
        </Suspense>
      ),
    },
    {
      path: "insert",
      element: (
        <Suspense fallback={Loading}>
          <ItemInsertPage />
        </Suspense>
      ),
    },
  ]
}

export default toItemRouter
