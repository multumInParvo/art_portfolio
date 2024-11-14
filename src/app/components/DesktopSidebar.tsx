'use client';

import React from 'react';
import Footer from '../components/Footer';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';
import { Moon, Sun } from 'lucide-react';
import PaintingDetails from './PaintingDetails';
import en from '../translations/en.json';
import fr from '../translations/fr.json';

type TranslationProps = typeof en | typeof fr; // Use union type if en and fr are slightly different 

interface DesktopSidebarProps {
    showPaintingDetails: boolean;
    pathname: string;
    translations: TranslationProps;
    theme: string;
    toggleTheme: () => void;
    language: string;
    toggleLanguage: () => void;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
    showPaintingDetails,
    translations,
    theme,
    toggleTheme,
    language,
    toggleLanguage,
}) => {
    return (
        <aside className="hidden md:flex md:w-64 md:flex-shrink-0 md:flex-col bg-white dark:bg-gray-900 dark:border-gray-800">
            <div className="p-10 flex flex-col h-full md:pr-0">
                <div>
                    <h1 className="block text-2xl md:text-3xl font-nunito whitespace-nowrap md:whitespace-normal">
                        <Link
                            href="/"
                            className="text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                            aria-label="Homepage - Oleksandr Pryvalov Paintings"
                        >
                            oleksandr<br /> pryvalov
                        </Link>
                    </h1>
                    <div>
                        <Link href="/thumbnails" className="text-darkGold dark:text-amber-400 text-base font-medium tracking-widest font-playfair relative inline-block">
                            {translations.paintings}
                        </Link>
                    </div>

                    <nav className="mt-5 space-y-1">
                        <div className="text-base space-y-2 flex flex-col font-bold text-gray-700">
                            <div className="relative">
                                <Link
                                    href="/about"
                                    className="text-gray-700 dark:text-gray-100 transition-all font-nunito inline-block relative after:content-[''] after:absolute after:-bottom-0 after:left-0 after:w-full after:h-[2px] after:scale-x-0 after:bg-gray-700 dark:after:bg-darkGold after:transition-transform after:duration-300 hover:after:scale-x-100"
                                >
                                    {translations.about}
                                </Link>
                            </div>

                            <div className="relative">
                                <Link
                                    href="/contact"
                                    className="text-gray-700 dark:text-gray-100 transition-all font-nunito inline-block relative after:content-[''] after:absolute after:-bottom-0 after:left-0 after:w-full after:h-[2px] after:scale-x-0 after:bg-gray-700 dark:after:bg-darkGold after:transition-transform after:duration-300 hover:after:scale-x-100"
                                >
                                    contact
                                </Link>
                            </div>

                            <div className='flex gap-3 mt-5'>
                                <Link
                                    href="https://www.instagram.com/oleksandrpryv/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram Profile - Oleksandr Pryvalov"
                                    className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2"
                                >
                                    <FaInstagram className="text-base text-gray-700 dark:text-gray-100 hover:text-gray-900 dark:hover:text-gray-200 transition-colors" aria-hidden="true" />
                                </Link>

                                <button
                                    onClick={toggleLanguage}
                                    className="bg-gray-100 dark:bg-gray-800 rounded-full w-5 h-5 focus:ring-darkGold text-gray-700 dark:text-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 text-xs font-medium"
                                    aria-label={translations.switch_language}
                                >
                                    {language}
                                </button>

                                <button
                                    onClick={toggleTheme}
                                    className="flex justify-center items-center rounded-full w-5 h-5 focus:ring-darkGold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2"
                                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                                >
                                    {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="mt-auto">
                    {showPaintingDetails && <PaintingDetails />}
                    <Footer />
                </div>
            </div>
        </aside>
    );
};

export default DesktopSidebar;
