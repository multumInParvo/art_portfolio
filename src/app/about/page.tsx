'use client';

import Image from 'next/image';
import en from '../translations/en.json'
import fr from '../translations/fr.json'
import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { language } = useLanguage();
  const translations = language === 'EN' ? en : fr;

  return (
    <div className="w-full flex flex-col items-center md:pr-16 md:max-w-3xl">
      <div className="w-full">
        <h1 className='text-2xl mb-2 mt-0 font-playfair md:text-3xl md:mb-10 border-b text-gray-800 dark:text-gray-100 dark:border-gray-700'>
        {translations.about}
        </h1>
      </div>

      <div className="flex flex-col gap-8 md:gap-14 mt-6 md:flex-row">
        <div className="w-full">
          <p className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 font-nunito">
          {translations.bio}
          </p>
        </div>

        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-[364px]">
            <Image
              src="/images/artist.webp"
              alt="Artist"
              width={364}
              height={364}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}