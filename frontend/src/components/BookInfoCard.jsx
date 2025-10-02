import React from "react";
import { Mail, Phone } from "lucide-react";

export default function BookInfoCard({ bookSet, onInquiry, isAuthenticated }) {
  return (
    <div className="bg-gray-900 rounded-md p-6 shadow-lg max-w-full">
      {/* Price & Inquiry */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
        <h3 className="text-lg sm:text-xl font-semibold">
          Price: ₹{bookSet.total_price}
        </h3>

        {isAuthenticated ? (
          <button
            onClick={() => onInquiry && onInquiry()}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded mt-2 sm:mt-0"
          >
            Inquiry
          </button>
        ) : (
          <button
            disabled
            className="bg-gray-700 text-gray-400 px-4 py-2 rounded cursor-not-allowed mt-2 sm:mt-0"
          >
            Login to Inquiry
          </button>
        )}
      </div>

      {/* Seller Information */}
      <div className="mb-4">
        <h4 className="text-sm sm:text-base font-semibold text-gray-300 mb-2">
          Seller Information
        </h4>

        {bookSet.seller ? (
          <div className="text-sm sm:text-base grid grid-cols-2 gap-2 text-gray-200">
            <div className="text-gray-400">Name:</div>
            <div>{bookSet.seller.name}</div>

            <div className="text-gray-400">Email:</div>
            <div className="inline-flex items-center gap-2 break-all">
              <Mail size={16} className="flex-shrink-0" />
              <a
                href={`mailto:${bookSet.seller.email}`}
                className="text-teal-300 hover:underline break-all"
              >
                {bookSet.seller.email}
              </a>
            </div>

            <div className="text-gray-400">Mobile:</div>
            <div className="flex items-center gap-2 flex-wrap">
              <Phone className="w-5 h-5 flex-shrink-0" />
              <a
                href={`tel:${bookSet.seller.mobile}`}
                className="text-teal-300 hover:underline break-words"
              >
                {bookSet.seller.mobile}
              </a>
            </div>

            <div className="text-gray-400">Branch:</div>
            <div>{bookSet.branch}</div>

            <div className="text-gray-400">Year:</div>
            <div>{bookSet.year}</div>
          </div>
        ) : (
          <p className="text-gray-400 italic">
            Please login to view seller details.
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <h4 className="text-sm sm:text-base font-semibold text-gray-300 mb-2">
          Book Set Description
        </h4>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          {bookSet.description}
        </p>
      </div>
    </div>
  );
}
