import React, { Suspense } from "react";
import ItemPage from "./../pages/item/ItemPage";

const Loading = <div className="loading">Loading...</div>;

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
  ];
};

export default toItemRouter;
