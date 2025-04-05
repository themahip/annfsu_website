import React from 'react';

const Hero = () => {
  return (
    <div id="home" className="relative h-[600px]">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            All Nepal National Free Students Union
          </h1>
          <p className="text-xl text-white mb-8">
            Empowering students, shaping the future of Nepal's education
          </p>
          <a
            href="#about"
            className="bg-red-700 text-white px-8 py-3 rounded-md hover:bg-red-800 transition duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;