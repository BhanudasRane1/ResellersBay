import React from "react";

export default function SearchBox({ label, placeholder, value, handleSearch }) {
  return (
    <div className="flex justify-center mt-6 mb-6 w-64 md:w-70 lg:w-96 xl:w-128 2xl:w-160 mx-auto">
      <div className="w-full max-w-3xl">
        {" "}
        {/* controls max width */}
        <input
          type="text"
          className="w-full px-4 py-2 text-base border rounded-md transition border-[#323743] focus:ring focus:ring-[#323743] focus:outline-none"
          placeholder={placeholder}
          value={value}
          onChange={(event) => handleSearch(event.target.value)}
        />
      </div>
    </div>
  );
}
