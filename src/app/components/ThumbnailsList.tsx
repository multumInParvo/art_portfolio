'use client';

import React from 'react';
import Image from 'next/image';

interface ThumbnailListProps {
  images: string[];
  currentImageSrc: string;
  onThumbnailClick: (imageSrc: string) => void;
}

export default function ThumbnailList({ images, currentImageSrc, onThumbnailClick }: ThumbnailListProps) {
  return (
    <div className="w-full max-w-xl mx-auto px-4">
      {/* Thumbnails View - Visible on medium and larger screens */}
      <div className="hidden md:flex gap-2 justify-center">
        {images.map((img, index) => (
          <div
            key={index}
            className={`w-16 h-16 relative cursor-pointer transition-opacity ${
              currentImageSrc === img ? 'ring-4 ring-black' : 'hover:opacity-80'
            }`}
            onClick={() => onThumbnailClick(img)}
          >
            <Image src={img} alt={`Thumbnail ${index + 1}`} layout="fill" objectFit="cover" />
          </div>
        ))}
      </div>

      {/* Bullet Points View - Visible on small screens */}
      <div className="flex md:hidden justify-center gap-4">
        <div className="flex space-x-4 text-gray-700">
          {images.map((_, index) => (
            <div
              key={index}
              className={`cursor-pointer text-6xl ${
                currentImageSrc === images[index] ? 'font-bold' : 'text-gray-500'
              }`}
              onClick={() => onThumbnailClick(images[index])}
            >
              ·
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}