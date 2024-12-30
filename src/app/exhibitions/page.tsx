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
                    {translations.exhibitions}
                </h1>
            </div>

            <div className="flex flex-col gap-8 md:gap-14 mt-6 md:flex-row md:mt-0">
                <div className="w-full space-y-4">
                    <p className="text-sm md:text-base font-semibold font-nunito">
                        {/* {translations['bio']} */}
                    </p>

                </div>

                <div
                    className="absolute left-20 transform -rotate-90 text-gray-200 tracking-widest text-5xl font-bold md:text-9xl whitespace-nowrap pointer-events-none hidden md:block"
                    style={{
                        top: language === 'EN' ? '69vh' : '71vh',
                        width: '200px',
                    }}
                >
                    {translations.exhibitions}
                </div>

            </div>
        </div>
    );
}