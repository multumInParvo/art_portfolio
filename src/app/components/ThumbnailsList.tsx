'use client';

import React from 'react';
import Image from 'next/image';
import { Circle } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';

interface ThumbnailListProps {
  images: string[];
  currentImageSrc: string;
  onThumbnailClickAction: (imageSrc: string) => void;
}

export default function ThumbnailList({
  images,
  currentImageSrc,
  onThumbnailClickAction,
}: ThumbnailListProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div>
      {/* Thumbnails View - Visible on medium and larger screens */}
      <div className="hidden md:flex gap-2">
        {images.map((img, index) => (
          <div
            key={index}
            className={`w-16 h-16 relative cursor-pointer transition-opacity ${
              currentImageSrc === img ? 'ring-4' : 'hover:opacity-80'
            }`}
            onClick={() => onThumbnailClickAction(img)}
          >
            <Image src={img} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* Bullet Points View - Visible on small screens */}
      <div className="md:hidden">
        <div className="flex space-x-4">
          {images.map((img, index) => {
            const isSelected = currentImageSrc === img;
            const fillColor = isDarkMode
              ? isSelected
                ? 'rgb(180, 180, 180)'
                : 'rgb(100, 100, 100)'
              : isSelected
              ? 'rgb(50, 50, 50)'
              : 'rgb(200, 200, 200)';
            const strokeColor = isDarkMode
              ? isSelected
                ? 'rgb(80, 80, 80)'
                : 'rgb(200, 200, 200)'
              : isSelected
              ? 'rgb(100, 100, 100)'
              : 'rgb(150, 150, 150)';

            return (
              <div key={index} className="cursor-pointer" onClick={() => onThumbnailClickAction(img)}>
                <Circle
                  size={14}
                  fill={fillColor}
                  stroke={strokeColor}
                  className={`transition-colors ${isSelected ? 'scale-110' : ''} hover:scale-110`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
