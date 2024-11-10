'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { paintings } from '../data/paintings';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function ImageViewer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState({
    src: paintings[0].src,
    isMainImage: true
  });

  useEffect(() => {
    // Move URL parameter handling inside useEffect
    const index = parseInt(searchParams.get('index') || '0');
    setCurrentIndex(index);
    setCurrentImage({
      src: paintings[index].src,
      isMainImage: true
    });
  }, [searchParams]); // Add searchParams as dependency

  const painting = paintings[currentIndex];
  const relatedImages = painting?.additionalImages || [];
  
  const allImages = [painting.src, ...relatedImages];
  const currentImageIndex = allImages.indexOf(currentImage.src);

  const handleNext = () => {
    const nextIndex = (currentImageIndex + 1) % allImages.length;
    setCurrentImage({
      src: allImages[nextIndex],
      isMainImage: nextIndex === 0
    });
  };

  const handlePrev = () => {
    const prevIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    setCurrentImage({
      src: allImages[prevIndex],
      isMainImage: prevIndex === 0
    });
  };

  const handleThumbnailClick = (imageSrc: string) => {
    setCurrentImage({
      src: imageSrc,
      isMainImage: imageSrc === painting.src
    });
  };

  const closeViewer = () => router.push('/thumbnails');

  return (
    <div className="flex flex-col items-center">
      <button onClick={closeViewer} className="absolute top-5 right-5">
        <X size={24} />
      </button>

      {/* Main Image Viewer */}
      <div className="relative flex items-center justify-center w-full h-[70vh]">
        <button onClick={handlePrev} className="absolute left-5">
          <ChevronLeft size={32} />
        </button>
        <Image 
          src={currentImage.src} 
          alt={painting.title} 
          width={500} 
          height={500} 
          className="object-cover" 
        />
        <button onClick={handleNext} className="absolute right-5">
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Thumbnails including main image */}
      <div className="mt-4 w-full max-w-xl px-4 mx-auto">
        <div className="flex gap-2 justify-center">
          {allImages.map((img, index) => (
            <div 
              key={index} 
              className="w-16 h-16 relative cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handleThumbnailClick(img)}
            >
              <Image 
                src={img} 
                alt={`Thumbnail ${index + 1}`} 
                layout="fill" 
                objectFit="cover" 
                className={`rounded-sm ${currentImage.src === img ? 'ring-2 ring-blue-500' : ''}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}