import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "@/assets/styles/index.scss";
import { router } from "@/router";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAuuphdL2PfhIwZLUfJ1WgvgkaDsjK90CQ",
  authDomain: "sue-3193e.firebaseapp.com",
  databaseURL: "https://sue-3193e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sue-3193e",
  storageBucket: "sue-3193e.appspot.com",
  messagingSenderId: "188217529044",
  appId: "1:188217529044:web:2060b5f39e3add6c5c2141"
};

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
