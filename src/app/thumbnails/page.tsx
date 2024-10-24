// pages/thumbnails.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { paintings } from '../data/paintings';

const ThumbnailsPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the md breakpoint
    };

    // Check initially
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleMobileClick = (title: string) => {
    if (isMobile) {
      // Replace spaces with hyphens and make lowercase for URL
      const urlFriendlyTitle = title.toLowerCase().replace(/\s+/g, '-');
      // Update URL without navigation
      window.history.replaceState({}, '', `#${urlFriendlyTitle}`);
    }
  };

  const ImageContent = ({ painting, index }: { painting: typeof paintings[0], index: number }) => (
    <div 
      className="relative w-full h-auto cursor-pointer"
      onClick={() => handleMobileClick(painting.title)}
    >
      <Image
        src={painting.src}
        alt={painting.title}
        layout='responsive'
        width={500}
        height={500}
        objectFit="cover"
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="md:rounded-lg"
        priority={index < 4}
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
      </div>
    </div>
  );

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {paintings.map((painting, index) => (
          <div key={painting.title} className="w-full space-y-2">
            {isMobile ? (
              <div>
                <ImageContent painting={painting} index={index} />
              </div>
            ) : (
              <Link href={`/?index=${index}`}>
                <ImageContent painting={painting} index={index} />
              </Link>
            )}

            {/* Centered painting details - only visible on mobile */}
            <div className="block md:hidden text-left">
              <h2 className="text-base font-bold font-nunito">
                {painting.title}
              </h2>
              <div className='flex gap-1'>
                <p className="text-xs font-nunito font-semibold">{`${painting.dimensions}, ${painting.year}`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThumbnailsPage;