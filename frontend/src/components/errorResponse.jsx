// ErrorPage.jsx
export default function ErrorPage({ error }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p className="text-gray-400 mb-4">
        {error?.statusText || error?.message || "Unknown error"}
      </p>
      <a href="/" className="text-teal-400 underline">
        Go back home
      </a>
    </div>
  );
}
