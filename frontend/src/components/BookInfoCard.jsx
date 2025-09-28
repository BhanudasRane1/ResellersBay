import React from "react";
import { Mail } from "lucide-react";

export default function BookInfoCard({ bookSet, onInquiry }) {
  return (
    <div className="bg-gray-900 rounded-md p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Price: ₹{bookSet.total_price}</h3>
        <button
          onClick={() => onInquiry && onInquiry()}
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
        >
          Inquiry
        </button>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-300 mb-2">
          Seller Information
        </h4>
        <div className="text-sm grid grid-cols-2 gap-2 text-gray-200">
          <div className="text-gray-400">Name:</div>
          <div>{bookSet.seller.name}</div>

          <div className="text-gray-400">Email:</div>
          <div className="flex items-center gap-2">
            <Mail size={14} />
            <a
              href={`mailto:${bookSet.seller.email}`}
              className="text-teal-300 hover:underline"
            >
              {bookSet.seller.email}
            </a>
          </div>

          <div className="text-gray-400">Mobile Number:</div>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${bookSet.seller.mobile}`}
              className="text-teal-300 hover:underline"
            >
              {bookSet.seller.mobile}
            </a>
          </div>

          <div className="text-gray-400">Branch:</div>
          <div>{bookSet.branch}</div>

          <div className="text-gray-400">Year:</div>
          <div>{bookSet.year}</div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-300 mb-2">
          Book Set Description
        </h4>
        <p className="text-sm text-gray-300 leading-relaxed">
          {bookSet.description}
        </p>
      </div>
    </div>
  );
}
