import axios from "axios";
import md5 from "blueimp-md5";
import React from "react";
import ReactDOM from "react-dom/client";
import { parseAuthFromLocalStorage } from "./utils/auth.ts";
import App from "./pages";
import "./main.css";

axios.defaults.baseURL = "https://no23.lavina.tech";

axios.interceptors.request.use((config) => {
  const auth = config.auth ?? parseAuthFromLocalStorage();

  const payload = `${config.method?.toUpperCase()}${config.url}${
    config.data ? JSON.stringify(config.data) : ""
  }${auth?.password}`;

  config.headers.set("Key", auth?.username);
  config.headers.set("Sign", md5(payload));

  return config;
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
