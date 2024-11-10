'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { paintings } from '../data/paintings';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function ImageViewer() {
  const router = useRouter();
  const queryIndex = parseInt(new URLSearchParams(window.location.search).get('index') || '0');
  const [currentIndex, setCurrentIndex] = useState(queryIndex);

  const painting = paintings[currentIndex];
  const relatedImages = painting?.additionalImages || [];

  const handleNext = () => setCurrentIndex((currentIndex + 1) % paintings.length);
  const handlePrev = () => setCurrentIndex((currentIndex - 1 + paintings.length) % paintings.length);
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
        <Image src={painting.src} alt={painting.title} width={500} height={500} className="object-cover" />
        <button onClick={handleNext} className="absolute right-5">
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Related Thumbnails */}
      <div className="mt-4 flex space-x-4 overflow-x-scroll">
        {relatedImages.map((img, index) => (
          <div key={index} className="w-24 h-24 relative">
            <Image src={img} alt={`Thumbnail ${index + 1}`} layout="fill" objectFit="cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
