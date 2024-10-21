'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePainting } from '../context/PaintingContext';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setCurrentPainting, setGoToPrevious, setGoToNext } = usePainting();

  useEffect(() => {
    const index = searchParams.get('index');
    if (index !== null) {
      const parsedIndex = parseInt(index, 10);
      if (!isNaN(parsedIndex) && parsedIndex >= 0 && parsedIndex < paintings.length) {
        setCurrentIndex(parsedIndex);
      }
    }
  }, [searchParams, paintings.length]);

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

  // Preload previous and next images
  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new window.Image();
      img.src = src;
    };

    const nextIndex = (currentIndex + 1) % paintings.length;
    const prevIndex = (currentIndex - 1 + paintings.length) % paintings.length;

    preloadImage(paintings[nextIndex].src);
    preloadImage(paintings[prevIndex].src);
  }, [currentIndex, paintings]);

  useEffect(() => {
    setGoToPrevious(() => goToPrevious);
    setGoToNext(() => goToNext);
  }, [goToPrevious, goToNext, setGoToPrevious, setGoToNext]);

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
    <div
      className="relative h-[calc(100vh-5rem)] w-full overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-live="polite"
      aria-label="Painting Slider"
    >
      <div className="absolute inset-0">
        <Image
          src={currentPainting.src} // Ensure this is a string
          alt={currentPainting.description || currentPainting.title}
          layout="fill" // Makes the image fill the container
          objectFit="contain" // Keeps the aspect ratio of the image
          priority // Optional: Loads the image with higher priority
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
