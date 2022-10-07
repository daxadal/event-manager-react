import React, { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";

import router from "./services/router";

export default function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
