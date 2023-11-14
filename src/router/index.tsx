import { createHashRouter, redirect } from "react-router-dom";
import { Catalog } from "@/pages/Catalog.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import Chapter1 from "@/pages/Chapter1.tsx";
import Chapter2 from "@/pages/Chapter2.tsx";
import Chapter3 from "@/pages/Chapter3.tsx";
import Meditation from "@/pages/Meditation.tsx";
import Chapter4 from "@/pages/Chapter4.tsx";
import AboutAuthors from "@/pages/AboutAuthors.tsx";
import {AddChaptersText} from "@/pages/AddChaptersText";
import { Cactus } from "@/pages/Cactus";

export const router = createHashRouter([
  {
    path: "/",
    loader: () => redirect("/catalog"),
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
  {
    path: "/add-text",
    errorElement: <ErrorPage />,
    element: <AddChaptersText />,
  },
  {
    path: "/klyuch-do-tekhniki-kaktus",
    errorElement: <ErrorPage />,
    element: <Cactus />,
  }
]);
