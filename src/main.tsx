import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider, redirect } from "react-router-dom";
import "./index.css";
import Catalog from "./pages/Catalog.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Chapter1 from "./pages/Chapter1.tsx";
import Chapter2 from "./pages/Chapter2.tsx";
import Chapter3 from "./pages/Chapter3.tsx";
import Meditation from "./pages/Meditation.tsx";
import Chapter4 from "./pages/Chapter4.tsx";
import AboutAuthors from "./pages/AboutAuthors.tsx";

const router = createHashRouter([
  {
    path: "/",
    loader: () => redirect('/catalog')
  },
  {
    path: "/catalog",
    element: <Catalog />,
  },
  {
    path: "/pobichnyy-efekt-uspihu",
    errorElement: <ErrorPage />,
    element: <Chapter1 />,
  },
  {
    path: "/vin-cilkom-normalnii",
    errorElement: <ErrorPage />,
    element: <Chapter2 />,
  },
  {
    path: "/mistress-mode",
    errorElement: <ErrorPage />,
    element: <Chapter3 />,
  },
  {
    path: "/meditation",
    errorElement: <ErrorPage />,
    element: <Meditation />,
  },
  {
    path: "/vdykh-vidykh-rivnovaha",
    errorElement: <ErrorPage />,
    element: <Chapter4 />,
  },
  {
    path: "/about-authors",
    errorElement: <ErrorPage />,
    element: <AboutAuthors />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
