'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePainting } from '../context/PaintingContext';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { Painting } from '../data/paintings';

type SliderProps = {
  paintings: Painting[];
};

export function SliderContent({ paintings }: SliderProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right'>('right');
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
      setAnimationDirection(direction === 'prev' ? 'right' : 'left');
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

  const navigateToImageViewer = () => {
    router.push(`/image-viewer?index=${currentIndex}`);
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
      <AnimatePresence initial={false} custom={animationDirection}>
        <motion.div
          key={currentPainting.src}
          initial={{ x: animationDirection === 'left' ? '100%' : '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: animationDirection === 'left' ? '-100%' : '100%' }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image
            src={currentPainting.src}
            alt={currentPainting.description || currentPainting.title}
            layout="fill"
            objectFit="contain"
            priority
            onLoadingComplete={handleImageLoad}
          />
        </motion.div>
      </AnimatePresence>

      {/* Left Navigation */}
      <button
        onClick={() => changeImage('prev')}
        className="hidden md:block absolute left-0 top-0 w-2/6 h-full bg-transparent cursor-w-resize focus:outline-none"
        aria-label="Previous Slide"
      />

      {/* Center Sensor */}
      <button
        onClick={navigateToImageViewer}
        className="hidden md:block absolute left-1/3 top-0 w-2/6 h-full bg-transparent cursor-pointer focus:outline-none"
        aria-label="Open Image Viewer"
      />

      {/* Right Navigation */}
      <button
        onClick={() => changeImage('next')}
        className="hidden md:block absolute right-0 top-0 w-2/6 h-full bg-transparent cursor-e-resize focus:outline-none"
        aria-label="Next Slide"
      />
    </div>
  );
}