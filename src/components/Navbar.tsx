import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

import logo from "../images/logo.jpg"

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src={logo}
                alt="ANNFSU Logo"
                className="h-12 w-auto"
              />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900">ANNFSU</h1>
                <p className="text-xs text-gray-600">Kathmandu University</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-gray-700 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') ? 'text-red-700' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-gray-700 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/about') ? 'text-red-700' : ''
              }`}
            >
              About
            </Link>
            <Link
              to="/articles"
              className={`text-gray-700 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/articles') ? 'text-red-700' : ''
              }`}
            >
              Articles
            </Link>
            <Link
              to="/members"
              className={`text-gray-700 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/members') ? 'text-red-700' : ''
              }`}
            >
              Members
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Admin
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/')
                ? 'text-red-700 bg-red-50'
                : 'text-gray-700 hover:text-red-700 hover:bg-red-50'
            }`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/about')
                ? 'text-red-700 bg-red-50'
                : 'text-gray-700 hover:text-red-700 hover:bg-red-50'
            }`}
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            to="/articles"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/articles')
                ? 'text-red-700 bg-red-50'
                : 'text-gray-700 hover:text-red-700 hover:bg-red-50'
            }`}
            onClick={closeMenu}
          >
            Articles
          </Link>
          <Link
            to="/members"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/members')
                ? 'text-red-700 bg-red-50'
                : 'text-gray-700 hover:text-red-700 hover:bg-red-50'
            }`}
            onClick={closeMenu}
          >
            Members
          </Link>
          {isAuthenticated ? (
            <div className="space-y-1">
              <Link
                to="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-700 hover:bg-red-50"
                onClick={closeMenu}
              >
                Admin
              </Link>
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-700 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-700 hover:bg-red-50"
              onClick={closeMenu}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;