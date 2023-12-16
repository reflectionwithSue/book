import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "@/assets/styles/index.scss";
import { router } from "@/router";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ThemeContextProvider } from "@/components/context/ThemeContext";
import { DisplaySizeContextProvider} from '@/components/context/DisplaySizeContext'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_BASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
getStorage(app);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <DisplaySizeContextProvider>
      <RouterProvider router={router} />
      </DisplaySizeContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
