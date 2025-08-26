import React, { useState } from "react";
import { Menu, X,Home, LogIn, LogOut, User } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice";
import { useNavigate } from "@tanstack/react-router";
import { logoutUser } from "../api/auth.api.js";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // const toggleAuth = () => {
  //   setIsLoggedIn(!isLoggedIn);
  //   setIsOpen(false); // Close mobile menu after action
  //   };
    
  const handleLogout = async () => {
    dispatch(logout());
    setIsOpen(false);
    const data = await logoutUser();
    console.log(data, "logout done!");
    navigate({ to: "/" });
  };


  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="">
            <Link
              to="/"
              className="w-8 h-8 text-indigo-600 mr-2 text-xl font-bold"
            >
              URL Shortener
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                >
                  <User className="w-4 h-4 mr-1" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                <LogIn className="w-4 h-4 mr-1" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 p-2"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-64 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 rounded-lg mt-2">
            <Link
              to="/"
              className="flex items-center w-full text-left px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-white rounded-md transition-colors duration-200"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center w-full text-left px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-white rounded-md transition-colors duration-200"
                >
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-3 py-2 text-red-600 hover:text-red-700 hover:bg-white rounded-md transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="flex items-center w-full text-left px-3 py-2 text-indigo-600 hover:text-indigo-700 hover:bg-white rounded-md transition-colors duration-200"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
