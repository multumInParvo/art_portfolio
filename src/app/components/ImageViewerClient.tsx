// components/ImageViewerClient.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { paintings } from '../data/paintings';
import { X } from 'lucide-react';
import ThumbnailList from './ThumbnailsList';
import ChevronButtons from './ChevronButtons';


export default function ImageViewerClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentIndex, setCurrentIndex] = useState(0);
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
    const nextIndex = (currentImageIndex + 1) % allImages.length;
    setCurrentImage({
      src: allImages[nextIndex],
      isMainImage: nextIndex === 0,
    });
  };

  const handlePrev = () => {
    const prevIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    setCurrentImage({
      src: allImages[prevIndex],
      isMainImage: prevIndex === 0,
    });
  };

  const handleThumbnailClick = (imageSrc: string) => {
    setCurrentImage({
      src: imageSrc,
      isMainImage: imageSrc === painting.src,
    });
  };

  const closeViewer = () => router.push('/thumbnails');

  return (
    <Suspense>
      <div className="flex flex-col items-center justify-center">
        <button onClick={closeViewer} className="absolute top-5 right-3 z-10">
          <X className='h-8 w-8 md:h-12 md:w-12 stroke-1' />
        </button>

        {/* Main Image Viewer */}
        <div className="relative flex items-center justify-center w-full h-[calc(100vh-10rem)]">
        <div className='hidden md:block'>
          <ChevronButtons onPrev={handlePrev} onNext={handleNext} />
          </div>
          <Image
            src={currentImage.src}
            alt={painting.title}
            layout="fill"
            objectFit="contain"
            className="object-cover md:max-w-[100vw] md:max-h-[75vh]"
          />
        </div>

        {/* Thumbnails including main image */}
        <div className="flex items-center justify-center max-w-xl px-4">
          <div className='md:hidden'>
            <ChevronButtons onPrev={handlePrev} onNext={handleNext} />
          </div>
          <ThumbnailList
            images={allImages}
            currentImageSrc={currentImage.src}
            onThumbnailClick={handleThumbnailClick}
          />
        </div>
      </div>
    </Suspense>
  );
}