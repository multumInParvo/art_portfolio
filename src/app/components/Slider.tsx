'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

type Painting = {
  src: string;
  title: string;
  description: string;
  dimensions: string;
  year: number;
};

type SliderProps = {
  paintings: Painting[];
};

export default function Slider({ paintings }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? paintings.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === paintings.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const currentPainting = paintings[currentIndex];

  useEffect(() => {
    const titleElement = document.getElementById('paintingTitle');
    const descriptionElement = document.getElementById('paintingDescription');
    const dimensionsElement = document.getElementById('paintingDimensions');
    const yearElement = document.getElementById('paintingYear');

    if (titleElement) titleElement.textContent = currentPainting.title;
    if (descriptionElement) descriptionElement.textContent = currentPainting.description;
    if (dimensionsElement) dimensionsElement.textContent = currentPainting.dimensions;
    if (yearElement) yearElement.textContent = currentPainting.year.toString();
  }, [currentPainting]);

  return (
    <div className="relative h-[calc(100vh-5rem)] w-full">
      <Image
        src={currentPainting.src}
        alt={currentPainting.title}
        fill
        style={{ objectFit: 'contain' }}
        priority
      />

      {/* Previous Arrow */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white bg-opacity-50 rounded-full shadow-lg hover:bg-opacity-75 transition-all ease-in-out"
        aria-label="Previous Slide"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Arrow */}
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white bg-opacity-50 rounded-full shadow-lg hover:bg-opacity-75 transition-all ease-in-out"
        aria-label="Next Slide"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
