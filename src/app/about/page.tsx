'use client';

import en from '../translations/en.json'
import fr from '../translations/fr.json'
import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { language } = useLanguage();
  const translations = language === 'EN' ? en : fr;

  return (
    <div className="w-full flex flex-col items-center md:max-w-3xl">
      <div className="w-full md:hidden">
        <h1 className='text-2xl mb-2 mt-0 font-nunito md:text-3xl md:mb-10 border-b dark:border-gray-700'>
          {translations.about}
        </h1>
      </div>

      <div className="flex flex-col gap-8 md:gap-14 mt-6 md:flex-row md:mt-0">
        <div className="w-full space-y-4">
          <p className="text-sm md:text-base font-semibold font-nunito">
            {translations['bio']}
          </p>
          <p className="text-sm md:text-base font-semibold font-nunito">
            {translations['artistStatement-01']}
          </p>
          <p className="text-sm md:text-base font-semibold font-nunito">
            {translations['artistStatement-02']}
          </p>
        </div>
      </div>
    </div>
  );
}