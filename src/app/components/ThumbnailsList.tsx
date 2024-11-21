'use client';

import React from 'react';
import Image from 'next/image';
import { Circle } from 'lucide-react';

interface ThumbnailListProps {
  images: string[];
  currentImageSrc: string;
  onThumbnailClick: (imageSrc: string) => void;
  isDarkMode: boolean; // Add a prop to indicate the current theme
}

export default function ThumbnailList({
  images,
  currentImageSrc,
  onThumbnailClick,
  isDarkMode,
}: ThumbnailListProps) {
  return (
    <div>
      {/* Thumbnails View - Visible on medium and larger screens */}
      <div className="hidden md:flex gap-2">
        {images.map((img, index) => (
          <div
            key={index}
            className={`w-16 h-16 relative cursor-pointer transition-opacity ${currentImageSrc === img ? 'ring-4' : 'hover:opacity-80'
              }`}
            style={
              {
                '--tw-ring-color': 'var(--ring-color)', // Custom ring color if needed
              } as React.CSSProperties
            }
            onClick={() => onThumbnailClick(img)}
          >
            <Image src={img} alt={`Thumbnail ${index + 1}`} layout="fill" objectFit="cover" />
          </div>
        ))}
      </div>

      {/* Bullet Points View - Visible on small screens */}
      <div className="md:hidden">
        <div className="flex space-x-4">
          {images.map((img, index) => {
            // Determine colors based on the dark mode and selection state
            const isSelected = currentImageSrc === img;
            const fillColor = isDarkMode
              ? isSelected
                ? 'rgb(180, 180, 180)' // Light gray fill for selected in dark mode
                : 'rgb(100, 100, 100)' // Dark gray fill for unselected in dark mode
              : isSelected
              ? 'rgb(50, 50, 50)' // Darker fill for selected in light mode
              : 'rgb(200, 200, 200)'; // Lighter fill for unselected in light mode
            const strokeColor = isDarkMode
              ? isSelected
                ? 'rgb(80, 80, 80)' // Darker stroke for selected in dark mode
                : 'rgb(200, 200, 200)' // Lighter stroke for unselected in dark mode
              : isSelected
              ? 'rgb(100, 100, 100)' // Light stroke for selected in light mode
              : 'rgb(150, 150, 150)'; // Neutral stroke for unselected in light mode

            return (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => onThumbnailClick(img)}
              >
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
