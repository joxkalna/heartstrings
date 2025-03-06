import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // Use createRoot for React 18
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
