'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { usePainting } from '../context/PaintingContext';

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
  const { setCurrentPainting, setGoToPrevious, setGoToNext } = usePainting();

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? paintings.length - 1 : prevIndex - 1
    );
  }, [paintings.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === paintings.length - 1 ? 0 : prevIndex + 1
    );
  }, [paintings.length]);

  useEffect(() => {
    setCurrentPainting(paintings[currentIndex]);
  }, [currentIndex, paintings, setCurrentPainting]);

  useEffect(() => {
    setGoToPrevious(() => goToPrevious);
    setGoToNext(() => goToNext);
  }, [goToPrevious, goToNext, setGoToPrevious, setGoToNext]);

  const currentPainting = paintings[currentIndex];

  return (
    <div className="relative h-[calc(100vh-5rem)] w-full">
      <Image
        src={currentPainting.src}
        alt={currentPainting.title}
        fill
        style={{ objectFit: 'contain' }}
        priority
      />

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