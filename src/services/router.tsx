import React from "react";
import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "../views/ErrorView";
import Home from "../views/Home";

export default createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);
