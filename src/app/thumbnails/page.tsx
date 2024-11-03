'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { paintings } from '../data/paintings';
import { useLanguage } from '../context/LanguageContext';
import en from '../translations/en.json'
import fr from '../translations/fr.json'

const ThumbnailsPage = () => {
  const { language } = useLanguage();
  const translations = language === 'EN' ? en : fr;
  const [isMobile, setIsMobile] = useState(false);
  const [touchedIndex, setTouchedIndex] = useState<number | null>(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const getUrlFriendlyTitle = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-');
  };

  const handleMobileClick = (title: string, index: number) => {
    if (isMobile) {
      const urlFriendlyTitle = getUrlFriendlyTitle(title);
      window.history.replaceState({}, '', `#${urlFriendlyTitle}`);
      setTouchedIndex(index);
      setTimeout(() => {
        setTouchedIndex(null);
      }, 300);
    }
  };

  const ImageContent = ({ painting, index }: { painting: typeof paintings[0], index: number }) => (
    <div
      className="relative w-full cursor-pointer"
      onClick={() => handleMobileClick(painting.title, index)}
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
        className={`absolute inset-0 bg-black transition-opacity duration-300 flex items-center justify-center
          ${isMobile
            ? touchedIndex === index
              ? 'bg-opacity-50'
              : 'bg-opacity-0'
            : 'bg-opacity-0 hover:bg-opacity-50'
          }`}
      >
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center md:max-w-6xl">
      <div className='w-full'>
        <h1 className='hidden md:block text-2xl mb-2 mt-0 font-playfair md:text-3xl md:mb-10 border-b dark:text-gray-100 dark:border-gray-700'>
          {translations.paintings_page}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 w-full md:gap-8">
        {paintings.map((painting, index) => (
          <div key={painting.title} className="w-full space-y-2">
            {isMobile ? (
              <div>
                <ImageContent painting={painting} index={index} />
              </div>
            ) : (
              <Link href={`/?painting=${getUrlFriendlyTitle(painting.title)}`}>
                <ImageContent painting={painting} index={index} />
              </Link>
            )}

            {/* Centered painting details - only visible on mobile */}
            <div className="block md:hidden text-left">
              <h2 className="text-base font-bold font-nunito text-gray-800 dark:text-gray-100">
                {painting.title}
              </h2>
              <div className='flex gap-1'>
                <p className="text-xs font-nunito font-semibold text-gray-600 dark:text-gray-300">
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