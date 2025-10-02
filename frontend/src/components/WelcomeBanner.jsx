export default function WelcomeBanner() {
  return (
    <div className="bg-[#001F1B] text-white rounded-md p-4 md:p-6 flex flex-col md:flex-row items-center md:justify-between gap-4">
      
      {/* Left Section */}
      <div className="text-center md:text-left">
        <h1 className="text-xl md:text-3xl font-bold mb-2">
          Welcome to Resellers Bay
        </h1>
        <p className="text-gray-300">
          Your one-stop platform for academic book sets.
        </p>
      </div>

      {/* Right Section - button full width on mobile */}
      <div className="w-full md:w-auto mt-2 md:mt-0 flex justify-center md:justify-end">
        <button className="w-full md:w-auto bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded">
          Explore Books
        </button>
      </div>
    </div>
  );
}
