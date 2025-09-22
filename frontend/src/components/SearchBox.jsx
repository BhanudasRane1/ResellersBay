import React from "react";

export default function SearchBox({ label, placeholder, value, handleSearch }) {
  return (
    <div className="flex items-center gap-3 pl-4 flex-1">
      <label className="text-lg font-semibold text-gray-700">{label}</label>
      <input
        type="text"
        className="px-4 py-2 text-base border rounded-md transition border-[#323743] focus:ring focus:ring-[#323743] focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={(event) => handleSearch(event.target.value)}
      />
    </div>
  );
}