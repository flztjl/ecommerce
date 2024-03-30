import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import axios from "axios";

// Set the baseURL to 'https://dummyjson.com'
axios.defaults.baseURL = "https://dummyjson.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
