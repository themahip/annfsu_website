import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import News from './News';
import Leadership from './Leadership';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[80vh] bg-gradient-to-r from-red-900 to-red-800">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Welcome to ANNFSU KU
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              All Nepal National Free Students Union - Kathmandu University
            </p>
            <Link
              to="/about"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-700 hover:bg-red-800"
            >
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* News Section */}
      <News />

      {/* Leadership Section */}
      <div className="py-4">
        <h2 className="text-3xl font-bold text-center mb-4">Our Leadership</h2>
        <Leadership />
      </div>
    </div>
  );
};

export default Home; 