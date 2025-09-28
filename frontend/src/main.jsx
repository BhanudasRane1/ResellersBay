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
import Home, { homeLoader } from "./components/Home.jsx";
import About from "./components/About.jsx";
import ContactForm, { contactAction } from "./components/Contact.jsx";
import Login from "./components/Login.jsx";
import SellForm, { sellAction, sellLoader } from "./components/Sell.jsx";
import SignUP from "./components/SignUP.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import BookDetailsPage, {
  bookDetailsLoader,
  bookInquiryAction,
} from "./components/BookDetailsPage.jsx";
import GlobalErrorPage from "./components/GlobalErrorPage.jsx";
import ResetPasswordConfirm from "./components/ResetPasswordConfirm.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<GlobalErrorPage />}>
    <Route index element={<Home />} loader={homeLoader} />
    <Route path="/home" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<ContactForm />} action={contactAction} />
    <Route path="/login" element={<Login />} />
    <Route
      path="/sell"
      element={<SellForm />}
      action={sellAction}
      loader={sellLoader}
    />
    <Route path="/signup" element={<SignUP />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route
      path="/book/:id"
      element={<BookDetailsPage />}
      loader={bookDetailsLoader}
      action={bookInquiryAction}
    />
    <Route
      path="/password-reset-confirm/:uid/:token"
      element={<ResetPasswordConfirm />}
    />
  </Route>
);
const appRouter = createBrowserRouter(routeDefinitions);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      draggable
      pauseOnHover
      theme={localStorage.getItem("theme") === "dark" ? "dark" : "light"}
      transition={Bounce}
    />
  </React.StrictMode>
);
