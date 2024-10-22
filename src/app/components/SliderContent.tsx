'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePainting } from '../context/PaintingContext';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import type { Painting } from '../data/paintings';

type SliderProps = {
  paintings: Painting[];
};

export function SliderContent({ paintings }: SliderProps) {
  const searchParams = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false); // Track image load status
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

  const changeImage = useCallback((direction: 'prev' | 'next') => {
    setIsImageLoaded(false); // Reset image loading state
    setCurrentIndex((prevIndex) => {
      if (direction === 'prev') {
        return prevIndex === 0 ? paintings.length - 1 : prevIndex - 1;
      } else {
        return prevIndex === paintings.length - 1 ? 0 : prevIndex + 1;
      }
    });
  }, [paintings.length]);

  // Ensure painting details update only after the image is fully loaded
  useEffect(() => {
    if (isImageLoaded) {
      setCurrentPainting(paintings[currentIndex]);
    }
  }, [isImageLoaded, currentIndex, paintings, setCurrentPainting]);

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
    setGoToPrevious(() => () => changeImage('prev'));
    setGoToNext(() => () => changeImage('next'));
  }, [changeImage, setGoToPrevious, setGoToNext]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        changeImage('prev');
      } else if (event.key === 'ArrowRight') {
        changeImage('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [changeImage]);

  const handleImageLoad = () => {
    setIsImageLoaded(true); // Mark image as loaded
  };

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
          src={currentPainting.src}
          alt={currentPainting.description || currentPainting.title}
          layout="fill"
          objectFit="contain"
          priority
          onLoadingComplete={handleImageLoad} // Trigger when image is loaded
        />
      </div>

      {/* Display the painting title and description */}
      <div className="absolute bottom-0 left-0 w-full p-4 text-white">
        <h2>{currentPainting.title}</h2>
        <p>{currentPainting.description}</p>
      </div>

      <button
        onClick={() => changeImage('prev')}
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
        onClick={() => changeImage('next')}
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
