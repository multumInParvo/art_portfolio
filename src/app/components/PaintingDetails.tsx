'use client';

import React from 'react';
import { usePainting } from '../context/PaintingContext';
import { useLanguage } from '../context/LanguageContext';
import en from '../translations/en.json'
import fr from '../translations/fr.json'

const PaintingDetails = React.memo(function PaintingDetails() {
  const { currentPainting, goToPrevious, goToNext } = usePainting();
  const { language } = useLanguage();
  const translations = language === 'EN' ? en : fr;

  if (!currentPainting) return null;

  const { title, dimensions, material, year } = currentPainting;

  return (
    <div className="hidden md:block">
      <h2 className="text-lg font-bold mb-1 font-nunito text-gray-600 dark:text-gray-100">
        {title}
      </h2>
      <p className="text-sm font-nunito text-gray-600 dark:text-gray-300">
        {dimensions} {material}
      </p>
      <p className="text-sm font-nunito text-gray-600 dark:text-gray-300">
        {year}
      </p>
      <div className="mt-2 text-sm hidden md:block">
        <button
          onClick={goToPrevious}
          className="relative inline-block font-nunito font-bold text-gray-600 dark:text-gray-300 transition-all
          after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:scale-x-0
          after:bg-gray-600 dark:after:bg-darkGold after:transition-transform after:duration-300
          hover:after:scale-x-100"
        >
          {translations.previous_btn}
        </button>
        <span className="mx-1 font-nunito font-bold text-gray-600 dark:text-gray-300">
          /
        </span>
        <button
          onClick={goToNext}
          className="relative inline-block font-nunito font-bold text-gray-600 dark:text-gray-300 transition-all
          after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:scale-x-0
          after:bg-gray-600 dark:after:bg-darkGold after:transition-transform after:duration-300
          hover:after:scale-x-100"
        >
          {translations.next_btn}
        </button>

      </div>
    </div>
  );
});

export default PaintingDetails;