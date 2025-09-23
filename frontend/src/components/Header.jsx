import React, { useState } from "react";
import { Menu, X, BookOpenText } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import SearchBox from "./SearchBox";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(""); // added search state

  const navLinkClass = "py-2 text-white hover:text-slate-600";
  const navActiveClass = "py-2 text-primary hover:text-slate-600";
  return (
    <header className="px-6 py-3 flex items-center justify-between shadow-md">
      <Link to="/" className="flex items-center space-x-2">
        <BookOpenText className="h-8 w-8 text-primary" />
        <span className="font-['DM Serif Display'] text-2xl leading-6 font-bold text-primary">
          ResellersBay
        </span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? navActiveClass : navLinkClass
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? navActiveClass : navLinkClass
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? navActiveClass : navLinkClass
          }
        >
          Contact
        </NavLink>
        <NavLink
          to="/sell"
          className={({ isActive }) =>
            isActive ? navActiveClass : navLinkClass
          }
        >
          Sell
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? navActiveClass : navLinkClass
          }
        >
          Login
        </NavLink>
      </nav>

      {/* Search Bar (desktop) */}
      <div className="hidden md:block">
        <SearchBox
          label={null}
          placeholder="Search by book name or branch"
          value={searchValue}
          handleSearch={setSearchValue}
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
        <div className="absolute top-14 left-0 w-full bg-transparent border-t border-gray-700 flex flex-col items-center py-4 space-y-4 md:hidden">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? navActiveClass : navLinkClass
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? navActiveClass : navLinkClass
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? navActiveClass : navLinkClass
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/sell"
            className={({ isActive }) =>
              isActive ? navActiveClass : navLinkClass
            }
          >
            Sell
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? navActiveClass : navLinkClass
            }
          >
            Login
          </NavLink>

         
        </div>
      )}
    </header>
  );
};

