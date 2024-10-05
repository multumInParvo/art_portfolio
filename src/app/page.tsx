// src/app/page.tsx
"use client";

import Slider from '../app/components/slider';

const images = [
  {
    src: '/path-to-image-1.jpg',
    description: 'Description of Image 1',
  },
  {
    src: '/path-to-image-2.jpg',
    description: 'Description of Image 2',
  },
  // Add more images as needed
];

export default function HomePage() {
  return (
    <div>
      {/* Other components and structure */}
      <Slider images={images} />
    </div>
  );
}
