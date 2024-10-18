'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePainting } from '../context/PaintingContext';
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
  const { setCurrentPainting, setGoToPrevious, setGoToNext } = usePainting();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToPrevious = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? paintings.length - 1 : prevIndex - 1
      );
    }
  }, [paintings.length, isTransitioning]);

  const goToNext = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === paintings.length - 1 ? 0 : prevIndex + 1
      );
    }
  }, [paintings.length, isTransitioning]);

  useEffect(() => {
    setCurrentPainting(paintings[currentIndex]);
    setGoToPrevious(() => goToPrevious);
    setGoToNext(() => goToNext);
    const timer = setTimeout(() => setIsTransitioning(false), 100);
    return () => clearTimeout(timer);
  }, [currentIndex, paintings, setCurrentPainting, setGoToPrevious, setGoToNext, goToPrevious, goToNext]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        goToNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToPrevious, goToNext]);

  const currentPainting = paintings[currentIndex];

  return (
    <div className="relative h-[calc(100vh-5rem)] w-full">
      <div
        className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
          isTransitioning ? 'opacity-90' : 'opacity-100'
        }`}
      >
        <Image
          src={currentPainting.src}
          alt={currentPainting.description || currentPainting.title}
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}