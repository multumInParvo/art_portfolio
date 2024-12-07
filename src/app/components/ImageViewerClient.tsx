import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSwipeable } from 'react-swipeable';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { paintings } from '../data/paintings';
import { X } from 'lucide-react';
import ThumbnailList from './ThumbnailsList';
import ChevronButtons from './ChevronButtons';

export default function ImageViewerClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right'>('right');
  const [currentImage, setCurrentImage] = useState({
    src: paintings[0].src,
    isMainImage: true,
  });

  useEffect(() => {
    const index = parseInt(searchParams.get('index') || '0');
    setCurrentIndex(index);
    setCurrentImage({
      src: paintings[index].src,
      isMainImage: true,
    });
  }, [searchParams]);

  const painting = paintings[currentIndex];
  const relatedImages = painting?.additionalImages || [];
  const allImages = [painting.src, ...relatedImages];
  const currentImageIndex = allImages.indexOf(currentImage.src);

  const handleNext = () => {
    setAnimationDirection('left');
    const nextIndex = (currentImageIndex + 1) % allImages.length;
    setCurrentImage({
      src: allImages[nextIndex],
      isMainImage: nextIndex === 0,
    });
  };

  const handlePrev = () => {
    setAnimationDirection('right');
    const prevIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    setCurrentImage({
      src: allImages[prevIndex],
      isMainImage: prevIndex === 0,
    });
  };

  const handleThumbnailClick = (imageSrc: string) => {
    setAnimationDirection('left');
    setCurrentImage({
      src: imageSrc,
      isMainImage: imageSrc === painting.src,
    });
  };

  const closeViewer = () => router.push('/thumbnails');

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrev();
      } else if (event.key === 'Escape') {
        closeViewer(); // Close viewer on pressing Escape
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentImageIndex, allImages]); // Dependencies to ensure updated state is used

  return (
    <Suspense>
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
          <motion.div
            key={currentImage.src}
            initial={{ x: animationDirection === 'left' ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: animationDirection === 'left' ? '-100%' : '100%' }}
            transition={{ duration: 0.6 }}
            className="absolute w-full h-full"
          >
            <Image
              src={currentImage.src}
              alt={painting.title}
              layout="fill"
              objectFit="contain"
              className="object-cover md:w-full md:h-full md:p-12 py-12"
            />
          </motion.div>
        </div>

        {/* Thumbnails including main image */}
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
