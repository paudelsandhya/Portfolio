import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Render the app
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);