import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Login from "./components/Login.jsx";
import Sell from "./components/Sell.jsx";

const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />}  />
    <Route path="/home" element={<Home />}  />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/login" element={<Login />} />
    <Route path="/sell" element={<Sell />} />
  </Route>
);
const appRouter = createBrowserRouter(routeDefinitions);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <RouterProvider router={appRouter} />  
  </React.StrictMode>
);
