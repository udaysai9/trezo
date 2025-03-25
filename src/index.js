import React from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./App";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AppWrapper />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found in the DOM!");
}
