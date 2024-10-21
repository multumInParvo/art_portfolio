// pages/thumbnails.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { paintings } from '../data/paintings';

const ThumbnailsPage = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {paintings.map((painting, index) => (
        <Link href={`/?index=${index}`} key={painting.title}>
          <div className="relative w-full h-40 cursor-pointer">
            <Image
              src={painting.src}
              alt={painting.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                {painting.title}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ThumbnailsPage;