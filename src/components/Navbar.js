import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 font-extrabold text-2xl text-blue-700 hover:text-cyan-500 transition-colors">
          <span className="text-3xl">🎓</span>
          Elite8 Digital
        </NavLink>
        {/* Nav Links */}
        <div className="flex gap-6">
          <NavLink
            to="/students"
            className={({ isActive }) =>
              `font-semibold text-blue-700 hover:text-cyan-500 transition-colors px-3 py-1 rounded-lg ${isActive ? 'bg-cyan-100' : ''}`
            }
          >
            All Students
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `font-semibold text-blue-700 hover:text-cyan-500 transition-colors px-3 py-1 rounded-lg ${isActive ? 'bg-cyan-100' : ''}`
            }
          >
            Profile
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 