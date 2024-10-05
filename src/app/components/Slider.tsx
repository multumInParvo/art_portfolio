// src/components/Slider.tsx
"use client"; 

import { useState } from 'react';

interface Image {
  src: string;
  description: string;
}

interface SliderProps {
  images: Image[];
}

const Slider: React.FC<SliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      <img
        src={images[currentIndex].src}
        alt={`Image ${currentIndex + 1}`}
        className="w-full h-auto"
      />
      {/* Description */}
      <p className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 p-2">
        {images[currentIndex].description}
      </p>
      {/* Arrows */}
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white"
        onClick={prevImage}
      >
        ←
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
        onClick={nextImage}
      >
        →
      </button>
    </div>
  );
};

export default Slider;
