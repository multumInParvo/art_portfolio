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
  const [isImageLoaded, setIsImageLoaded] = useState(false);
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

  const changeImage = useCallback(
    (direction: 'prev' | 'next') => {
      setIsImageLoaded(false);
      setCurrentIndex((prevIndex) => {
        let newIndex = prevIndex;
        if (direction === 'prev') {
          newIndex = prevIndex === 0 ? paintings.length - 1 : prevIndex - 1;
        } else if (direction === 'next') {
          newIndex = prevIndex === paintings.length - 1 ? 0 : prevIndex + 1;
        }
        return newIndex;
      });
    },
    [paintings.length]
  );

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
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeImage]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
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
          onLoadingComplete={handleImageLoad}
        />
      </div>
      {/* Navigation click areas */}
      <button
        onClick={() => changeImage('prev')}
        className="hidden md:block absolute left-0 top-0 w-1/2 h-full bg-transparent cursor-w-resize"
        aria-label="Previous Slide"
      />
      <button
        onClick={() => changeImage('next')}
        className="hidden md:block absolute right-0 top-0 w-1/2 h-full bg-transparent cursor-e-resize"
        aria-label="Next Slide"
      />
    </div>
  );
}