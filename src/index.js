import React from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./App"; // Your main wrapper component

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AppWrapper /> {/* AppWrapper contains your app's main logic */}
    </React.StrictMode>
  );
} else {
  console.error("Root element not found in the DOM!");
}
