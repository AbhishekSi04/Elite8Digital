import React from "react";
import Hero from '../assets/Hero.webp';
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-100 to-white flex flex-col justify-between">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 pt-16 pb-8 gap-10">
        {/* Text Content */}
        <div className="flex-1 flex flex-col items-start justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 leading-tight">
            Student Fee Management <span className="text-cyan-500">Made Easy</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-700 mb-8 max-w-lg">
            Securely track, pay, and manage your student fees. Update your profile, view payment status, and stay organized—all in one place.
          </p>
          <Link to="/students" className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full shadow-lg text-lg transition-all">
            Get Started
          </Link>
        </div>
        {/* Hero Illustration */}
        <div className="flex-1 flex items-center justify-center">
          {/* Open source SVG illustration (placeholder) */}
          <img
            src={Hero}
            alt="Student Fee Illustration"
            className="w-80 md:w-96 drop-shadow-xl rounded-2xl bg-white/60 p-4"
          />
        </div>
      </div>
      {/* Mock Stats Section */}
      <div className="w-full bg-white/80 py-8 px-4 flex flex-col md:flex-row items-center justify-center gap-8 shadow-inner">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-800">1,200+</span>
          <span className="text-blue-600 text-sm mt-1">Students Registered</span>
        </div>
        <div className="w-8 h-1 bg-cyan-200 rounded-full hidden md:block"></div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-cyan-600">98%</span>
          <span className="text-blue-600 text-sm mt-1">Fees Paid On Time</span>
        </div>
        <div className="w-8 h-1 bg-cyan-200 rounded-full hidden md:block"></div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-800">24/7</span>
          <span className="text-blue-600 text-sm mt-1">Secure Access</span>
        </div>
      </div>
    </div>
  );
}

export default Landing; 