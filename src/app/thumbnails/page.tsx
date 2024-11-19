'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { paintings } from '../data/paintings';
import { useLanguage } from '../context/LanguageContext';
import en from '../translations/en.json';
import fr from '../translations/fr.json';

const ThumbnailsPage = () => {
  const { language } = useLanguage();
  const router = useRouter();
  const translations = language === 'EN' ? en : fr;
  const [touchedIndex, setTouchedIndex] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setTouchedIndex(index);
    // Add a small delay for the touch feedback animation
    setTimeout(() => {
      setTouchedIndex(null);
      router.push(`/image-viewer?index=${index}`);
    }, 150);
  };

  const ImageContent = ({ painting, index }: { painting: typeof paintings[0], index: number }) => (
    <div
      className="relative w-full cursor-pointer"
      onClick={() => handleImageClick(index)}
      role="button"
      aria-label={`View ${painting.title}`}
    >
      <Image
        src={painting.src}
        alt={painting.title}
        layout='responsive'
        width={500}
        height={500}
        objectFit="cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={index < 4}
      />
      <div
        className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center
          ${touchedIndex === index ? 'bg-black bg-opacity-50' : 'bg-opacity-0'}`}
      >
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center md:max-w-6xl">
      <div className='w-full'>
        <h1 className='hidden md:block text-2xl mb-2 mt-0 font-nunito md:text-3xl md:mb-10 border-b dark:border-gray-700'>
          {translations.paintings_page}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full md:gap-8">
        {paintings.map((painting, index) => (
          <div key={painting.title} className="w-full space-y-2">
            <ImageContent painting={painting} index={index} />

            {/* Centered painting details - only visible on mobile */}
            <div className="block md:hidden text-left">
              <h2 className="text-base font-bold font-nunito">
                {painting.title}
              </h2>
              <div className='flex gap-1'>
                <p className="text-xs font-nunito font-semibold">
                  {`${painting.dimensions}, ${translations.material}, ${painting.year}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThumbnailsPage;