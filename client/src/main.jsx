import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./simgeler.css";
ReactDOM.createRoot(document.getElementById("sandik")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.error = () => {};
