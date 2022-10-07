import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Root from "../views/Root";
import ErrorPage from "../views/ErrorView";
import Home from "../views/Home";
import EventCreation from "../views/EventCreation";
import EventDetail from "../views/EventDetail";
import EventList from "../views/EventList";
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";

export default createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/events",
        element: <EventList />,
      },
      {
        path: "/events/new",
        element: <EventCreation />,
      },
      {
        path: "/events/:id",
        element: <EventDetail />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
]);
