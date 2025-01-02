"use client"
import React, { useState, useEffect } from 'react';

const Hero = ({ title, subtitle, description }) => {
  const backgroundImages = [
    '/images/hero-background-1.jpg',
    '/images/hero-background-2.jpg',
    '/images/hero-background-3.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative h-[500px] overflow-hidden"> {/* Fixed height container */}
      {backgroundImages.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={img}
            alt={`Hero Background ${index + 1}`}
            className="w-full h-full object-cover object-center" // Center the image
            style={{ 
              objectPosition: '50% 50%' // Adjust this to control focal point
            }}
          />
        </div>
      ))}
      
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 
            className="text-8xl font-bold text-center mb-4 text-white" 
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            {title}
          </h1>
          <h2 
            className="text-4xl text-center mb-2 text-white" 
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            {subtitle}
          </h2>
          <p 
            className="text-3xl text-center text-blue-200" 
            style={{ fontFamily: 'Open Sans, sans-serif', fontStyle: 'italic' }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="flex justify-center gap-2">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-110' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;