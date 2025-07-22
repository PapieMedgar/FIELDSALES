import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-white px-4">
    <div className="max-w-3xl w-full text-center">
      <h1 className="text-5xl font-bold text-blue-600 tracking-wide mb-2">Field Sales</h1>
      <h2 className="text-2xl font-normal text-gray-800 mb-6">by GoNxt</h2>

      <p className="text-lg text-gray-600 mb-4">
        Welcome to Field Sales, your modern platform for tracking field agent activity, store visits, and more.
      </p>

      <p className="text-lg text-gray-700 font-medium mb-10">
        Streamline your sales operations, monitor performance, and gain insights—all in one place.
      </p>

      <div className="flex justify-center gap-6">
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-200"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-300 transition duration-200"
        >
          Register
        </Link>
      </div>
    </div>
  </div>
);

export default LandingPage;
