import React, { useEffect } from "react";
import { useRouteError } from "react-router-dom";
import { toast } from "react-toastify";

export default function GlobalErrorPage() {
  const error = useRouteError();
  let message = "Something went wrong.";
  let status = 500;

  if (error?.status === 401) {
    message = "You must be logged in to access this page.";
    status = 401;
  } else if (error?.status === 404) {
    message = "Page not found.";
    status = 404;
  } else if (error?.status === 500) {
    message = "Internal server error.";
    status = 500;
  }

  // Show toast once when error occurs
  useEffect(() => {
    toast.error(message, { position: "top-right" });
  }, [message]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <h1 className="text-4xl font-bold text-red-400 mb-4">Error {status}</h1>
      <p className="text-lg text-center">{message}</p>

      <a
        href="/"
        className="mt-6 px-4 py-2 bg-teal-500 rounded hover:bg-teal-600"
      >
        Go Home
      </a>
    </div>
  );
}
