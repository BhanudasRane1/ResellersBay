import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-teal-400">✶</span>
        <h1 className="text-xl font-semibold text-teal-400">ResellersBay</h1>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-6">
        <a href="/" className="text-teal-400 font-medium hover:text-teal-300">
          Home
        </a>
        <a href="/about" className="hover:text-teal-300">
          About
        </a>
        <a href="/contact" className="hover:text-teal-300">
          Contact
        </a>
        <a href="/sell" className="hover:text-teal-300">
          Sell
        </a>
        <a href="/login" className="hover:text-teal-300">
          Login
        </a>
      </nav>

      {/* Search Bar */}
      <div className="hidden md:block relative">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search by book name or branch"
          className="bg-transparent border border-gray-600 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-400"
        />
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-black border-t border-gray-700 flex flex-col items-center py-4 space-y-4 md:hidden">
          <a href="/" className="text-teal-400 font-medium">
            Home
          </a>
          <a href="/about" className="hover:text-teal-300">
            About
          </a>
          <a href="/contact" className="hover:text-teal-300">
            Contact
          </a>
          <a href="/sell" className="hover:text-teal-300">
            Sell
          </a>
          <a href="/login" className="hover:text-teal-300">
            Login
          </a>
          <div className="relative w-11/12">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by book name or branch"
              className="w-full bg-transparent border border-gray-600 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-400"
            />
          </div>
        </div>
      )}
    </header>
  );
};
