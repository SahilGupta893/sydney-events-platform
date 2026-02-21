import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight">
          Sydney<span className="text-gray-400">Events</span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {user && (
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-black transition"
            >
              Dashboard
            </Link>
          )}

          {user ? (
            <div className="relative">
              {/* Avatar Button */}
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center space-x-3 focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-medium">
                  {user.name?.charAt(0)}
                </div>

                <span className="text-sm font-medium">{user.name}</span>
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg border py-2">
                  <button
                    onClick={() =>
                      (window.location.href =
                        "http://localhost:5002/auth/logout")
                    }
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a
              href="http://localhost:5002/auth/google"
              className="bg-black text-white px-4 py-2 rounded-lg text-sm"
            >
              Admin Login
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
