import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import UserInfoProvider from "./components/userInfo/UserInfoProvider";
import ToastProvider from "./components/toaster/ToastProvider";
import UserNavigationProvider from "./components/userInfo/UserNavigationProvider";

library.add(fab);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  // <React.StrictMode> // https://flaviocopes.com/react-useeffect-two-times/
  <UserInfoProvider>
    <ToastProvider>
      <UserNavigationProvider>
        <App />
      </UserNavigationProvider>
    </ToastProvider>
  </UserInfoProvider>
  // </React.StrictMode>
);
