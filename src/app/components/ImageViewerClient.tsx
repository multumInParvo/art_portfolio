'use client';

import React, { useState, useEffect, useCallback, Suspense, useMemo, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSwipeable } from 'react-swipeable';
import Image from 'next/image';
import { X } from 'lucide-react';
import { gsap } from 'gsap';
import ThumbnailList from './ThumbnailsList';
import ChevronButtons from './ChevronButtons';
import { paintings } from '../data/paintings';

export default function ImageViewerClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState({
    src: paintings[0].src,
    isMainImage: true,
  });

  const imageContainerRef = useRef<HTMLDivElement>(null); // Reference for animation

  useEffect(() => {
    const index = parseInt(searchParams.get('index') || '0', 10);
    setCurrentIndex(index);
    setCurrentImage({
      src: paintings[index].src,
      isMainImage: true,
    });
  }, [searchParams]);

  const painting = paintings[currentIndex];
  const relatedImages = useMemo(() => painting?.additionalImages || [], [painting]);

  const allImages = useMemo(() => [painting.src, ...relatedImages], [painting.src, relatedImages]);

  const currentImageIndex = allImages.indexOf(currentImage.src);

  const animateImageTransition = (direction: 'left' | 'right') => {
    const container = imageContainerRef.current;

    if (container) {
      const fromX = direction === 'left' ? '100%' : '-100%';

      gsap.fromTo(
        container,
        { x: fromX },
        { x: '0%', duration: 0.6, ease: 'power1.out' }
      );
    }
  };

  const handleNext = useCallback(() => {
    const nextIndex = (currentImageIndex + 1) % allImages.length;
    animateImageTransition('left');
    setCurrentImage({
      src: allImages[nextIndex],
      isMainImage: nextIndex === 0,
    });
  }, [currentImageIndex, allImages]);

  const handlePrev = useCallback(() => {
    const prevIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    animateImageTransition('right');
    setCurrentImage({
      src: allImages[prevIndex],
      isMainImage: prevIndex === 0,
    });
  }, [currentImageIndex, allImages]);

  const handleThumbnailClick = useCallback(
    (imageSrc: string) => {
      setCurrentImage({
        src: imageSrc,
        isMainImage: imageSrc === painting.src,
      });
    },
    [painting.src]
  );

  const closeViewer = useCallback(() => router.push('/thumbnails'), [router]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') handleNext();
      if (event.key === 'ArrowLeft') handlePrev();
      if (event.key === 'Escape') closeViewer();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNext, handlePrev, closeViewer]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-center justify-center">
        <button onClick={closeViewer} className="absolute top-5 right-3 z-10">
          <X className="h-8 w-8 md:h-12 md:w-12 stroke-1" />
        </button>

        {/* Main Image Viewer */}
        <div
          className="relative flex items-center justify-center w-full h-[calc(100vh-13rem)] overflow-hidden"
          {...swipeHandlers}
        >
          <div className="hidden md:block">
            <ChevronButtons onPrev={handlePrev} onNext={handleNext} />
          </div>
          <div
            ref={imageContainerRef}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          >
<Image
  src={currentImage.src}
  alt={painting.title}
  fill
  className="object-contain md:w-full md:h-full md:p-10 py-12"
/>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex items-center justify-center max-w-xl px-4">
          <div className="md:hidden">
            <ChevronButtons onPrev={handlePrev} onNext={handleNext} />
          </div>
          <ThumbnailList
            images={allImages}
            currentImageSrc={currentImage.src}
            onThumbnailClickAction={handleThumbnailClick}
          />
        </div>
      </div>
    </Suspense>
  );
}
