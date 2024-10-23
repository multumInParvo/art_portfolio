// pages/thumbnails.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { paintings } from '../data/paintings';

const ThumbnailsPage = () => {
  return (
    <div> {/* Container with responsive padding */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {paintings.map((painting, index) => (
          <div key={painting.title} className="w-full space-y-2">
            <Link href={`/?index=${index}`}>
              <div className="relative w-full h-auto cursor-pointer">
                <Image
                  src={painting.src}
                  alt={painting.title}
                  layout='responsive'
                  width={500} // Use actual or approximate dimensions of the images
                  height={500} // Use dynamic height based on the image
                  objectFit="cover" // Changed to cover for full width coverage
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="md:rounded-lg"
                  priority={index < 4}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-center opacity-0 hover:opacity-100 transition-opacity duration-300 px-2">
                    {painting.title}
                  </p>
                </div>
              </div>
            </Link>
            
            {/* Centered painting details - only visible on mobile */}
            <div className="block md:hidden text-left">
              <h2 className="text-lg font-semibold mb-1 font-nunito text-gray-600">
                {painting.title}
              </h2>
              <p className="text-sm font-nunito">{painting.dimensions}</p>
              <p className="text-sm font-nunito">{painting.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThumbnailsPage;