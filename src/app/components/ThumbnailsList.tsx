'use client';

import React from 'react';
import Image from 'next/image';
import { Circle } from 'lucide-react';

interface ThumbnailListProps {
  images: string[];
  currentImageSrc: string;
  onThumbnailClick: (imageSrc: string) => void;
}

export default function ThumbnailList({ images, currentImageSrc, onThumbnailClick }: ThumbnailListProps) {
  return (
    <div>
      {/* Thumbnails View - Visible on medium and larger screens */}
      <div className="hidden md:flex gap-2">
        {images.map((img, index) => (
          <div
            key={index}
            className={`w-16 h-16 relative cursor-pointer transition-opacity ${currentImageSrc === img ? 'ring-4' : 'hover:opacity-80'
              }`}
            style={{
              '--tw-ring-color': 'var(--ring-color)', 
            } as React.CSSProperties} 
            onClick={() => onThumbnailClick(img)}
          >
            <Image src={img} alt={`Thumbnail ${index + 1}`} layout="fill" objectFit="cover" />
          </div>
        ))}
      </div>

      {/* Bullet Points View - Visible on small screens */}
      <div className="md:hidden">
        <div className="flex space-x-4 text-gray-700">
          {images.map((img, index) => {
            const fillColor = currentImageSrc === img ? 'rgb(50, 50, 50)' : 'rgb(200, 200, 200)';
            return (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => onThumbnailClick(img)}
              >
                <Circle
                  size={14}
                  fill={fillColor}
                  stroke={fillColor} // Stroke matches the fill color
                  className={`transition-colors ${currentImageSrc === img ? 'hover:fill-black hover:stroke-black' : 'hover:fill-gray-500 hover:stroke-gray-500'
                    }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
