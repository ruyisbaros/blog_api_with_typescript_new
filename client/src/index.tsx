import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="990502724260-m7rogb1n8emed93mge473drniqjvvimb.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    ;
  </Provider>
);
