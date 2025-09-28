import { useState, useEffect } from "react";
import { Menu, X, BookOpenText } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState(null); // reactive user state
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage on mount
    const storedUser = localStorage.getItem("user");

    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const navLinkClass = "py-2 text-white hover:text-slate-600";
  const navActiveClass = "py-2 text-primary hover:text-slate-600";

  return (
    <header className="px-6 py-3 flex items-center justify-between shadow-md relative">
      <Link to="/" className="flex items-center space-x-2">
        <BookOpenText className="h-8 w-8 text-primary" />
        <span className="font-['DM Serif Display'] text-2xl leading-6 font-bold text-primary">
          ResellersBay
        </span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-6 items-center">
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

        {/* Login / Username */}
        {user ? (
          <div className="relative group cursor-pointer">
            <span className="text-white font-semibold">{user.username}</span>
            <div className="absolute right-0 mt-2 w-24 bg-gray-800 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? navActiveClass : navLinkClass
            }
          >
            Login
          </NavLink>
        )}
      </nav>

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

          {user ? (
            <button
              onClick={handleLogout}
              className="text-white px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 w-full"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? navActiveClass : navLinkClass
              }
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
}
