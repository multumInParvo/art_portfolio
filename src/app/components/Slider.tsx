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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { setCurrentPainting, setGoToPrevious, setGoToNext } = usePainting();

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
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [currentIndex, paintings, setCurrentPainting]);

  useEffect(() => {
    setGoToPrevious(() => goToPrevious);
    setGoToNext(() => goToNext);
  }, [goToPrevious, goToNext, setGoToPrevious, setGoToNext]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') goToPrevious();
      if (event.key === 'ArrowRight') goToNext();
    },
    [goToPrevious, goToNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const currentPainting = paintings[currentIndex];

  return (
    <div
      className="relative h-[calc(100vh-5rem)] w-full overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-live="polite"
      aria-label="Painting Slider"
    >
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
        aria-controls="carousel"
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
        aria-controls="carousel"
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
