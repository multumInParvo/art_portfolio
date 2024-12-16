import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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

  const [zoomActive, setZoomActive] = useState(false); // State to track if zoom is activated
  const [zoomStyles, setZoomStyles] = useState({}); // Styles for zoomed image
  const zoomContainerRef = useRef<HTMLDivElement>(null); // Ref for zoom container
  const imageContainerRef = useRef<HTMLDivElement>(null); // Ref for animations

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

  const handleMouseMove = (event: React.MouseEvent) => {
    if (zoomActive && zoomContainerRef.current) {
      const { left, top, width, height } = zoomContainerRef.current.getBoundingClientRect();
      let x = ((event.clientX - left) / width) * 100;
      let y = ((event.clientY - top) / height) * 100;

      // Clamp the x and y values to stay within bounds
      const xMin = 50; // Minimum percentage for x-axis
      const xMax = 50; // Maximum percentage for x-axis
      const yMin = 0; // Minimum percentage for y-axis
      const yMax = 100; // Maximum percentage for y-axis

      x = Math.min(Math.max(x, xMin), xMax);
      y = Math.min(Math.max(y, yMin), yMax);

      setZoomStyles({
        transform: `scale(2)`,
        transformOrigin: `${x}% ${y}%`,
      });
    }
  };

  const toggleZoom = () => {
    setZoomActive((prev) => !prev);

    if (!zoomActive) {
      // If zoom is being activated
      setZoomStyles({ transform: 'scale(1)' });
    } else {
      // If zoom is being deactivated
      setZoomStyles({});
    }
  };

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
    <div className="flex flex-col items-center justify-center">
      <button onClick={closeViewer} className="absolute top-5 right-3 z-10">
        <X className="h-8 w-8 md:h-12 md:w-12 stroke-1" />
      </button>

      {/* Background Overlay */}
      <div
        className={`fixed inset-0 transition-colors duration-300 ${zoomActive ? 'bg-black/80' : 'bg-transparent'
          } z-10 pointer-events-none`}
      />

      {/* Main Image Viewer */}
      <div
        className={`relative flex items-center justify-center w-full h-[calc(100vh-13rem)] overflow-hidden ${zoomActive ? 'z-20' : 'z-0'
          }`}
        {...swipeHandlers}
      >
        <div className="hidden md:block">
          <ChevronButtons onPrev={handlePrev} onNext={handleNext} />
        </div>
        <div
          ref={imageContainerRef}
          className="relative w-full h-full"
        >
          <div
            ref={zoomContainerRef}
            onMouseMove={handleMouseMove}
            onClick={toggleZoom}
            className={`relative w-full h-full overflow-hidden ${zoomActive ? 'cursor-zoom-out' : 'cursor-pointer'
              }`}
          >
            <Image
              src={currentImage.src}
              alt={painting.title}
              fill
              style={zoomStyles}
              className="object-contain transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex items-center justify-center max-w-xl px-4 py-4">
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
  );
}
