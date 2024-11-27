'use client';

import React from 'react';
import Footer from '../components/Footer';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';
import { Moon, Sun } from 'lucide-react';
import PaintingDetails from './PaintingDetails';
import en from '../translations/en.json';
import fr from '../translations/fr.json';

type TranslationProps = typeof en | typeof fr;

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
        <aside className="hidden md:flex md:w-64 md:flex-shrink-0 md:flex-col">
            <div className="p-10 flex flex-col h-full md:pr-0">
                <div>

                    <div
                        
                        className="group relative flex flex-col items-start mb-3"
                        aria-label="Homepage - Oleksandr Pryvalov Paintings"
                    >
                        <Link href="/" className="absolute top-[1.2rem] font-playfair text-2xl tracking-widest uppercase cursor-pointer">
                            <span className='absolute top-[0.5rem] text-xs'>
                                Oleksandr
                            </span> <br />
                            <span className='absolute top-[1.3rem] text-sm font-bold'>
                                Pryvalov
                            </span>
                        </Link>

                        <Link href="/" className="relative">
                            {/* 'O' */}
                            <span className="font-cinzel text-8xl leading-none block">O</span>
                            {/* 'P' Positioned in the lower half of 'O' */}
                            <span className="absolute font-cinzel text-8xl leading-none bottom-[10%] left-1/2 transform -translate-x-[30%] translate-y-[33%]">
                                P
                            </span>
                        </Link>
                    </div>


                    <div>
                        <Link href="/thumbnails" className="text-base font-medium tracking-widest font-playfair relative inline-block">
                            {translations.paintings}
                        </Link>
                    </div>

                    <nav className="mt-5 space-y-1">
                        <div className="text-base space-y-2 flex flex-col font-bold">
                            <div className="relative">
                                <Link
                                    href="/about"
                                    className="font-nunito inline-block relative after:content-[''] after:absolute after:-bottom-0 after:left-0 after:w-full after:h-[2px] after:scale-x-0 after:bg-gray-700 dark:after:bg-darkGold after:transition-transform after:duration-300 ease-in-out hover:after:scale-x-100"
                                >
                                    {translations.about}
                                </Link>
                            </div>

                            <div className="relative">
                                <Link
                                    href="/contact"
                                    className="font-nunito inline-block relative after:content-[''] after:absolute after:-bottom-0 after:left-0 after:w-full after:h-[2px] after:scale-x-0 after:bg-gray-700 dark:after:bg-darkGold after:transition-transform after:duration-300 ease-in-out hover:after:scale-x-100"
                                >
                                    contact
                                </Link>
                            </div>

                            <div className='flex gap-3 mt-5'>
                                <Link
                                    href="https://www.instagram.com/oleksandr.pryvalov.art/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram Profile - Oleksandr Pryvalov"
                                    className="flex items-center justify-center w-5 h-5 rounded-full focus:outline-none hover:shadow-[2px_2px_8px_2px_rgba(0,0,0,0.3)] dark:hover:shadow-[2px_2px_8px_2px_rgba(255,255,255,0.25)] transition-shadow duration-300 ease-in-out"
                                >
                                    <FaInstagram className="text-base hover:text-gray-900 dark:hover:text-gray-200" aria-hidden="true" />
                                </Link>

                                <button
                                    onClick={toggleLanguage}
                                    className="rounded-full w-5 h-5 focus:outline-none text-xs font-medium hover:shadow-[2px_2px_8px_2px_rgba(0,0,0,0.3)] dark:hover:shadow-[2px_2px_8px_2px_rgba(255,255,255,0.25)] transition-shadow duration-300"
                                    aria-label={translations.switch_language}
                                >
                                    {language}
                                </button>

                                <button
                                    onClick={toggleTheme}
                                    className="flex justify-center items-center rounded-full w-5 h-5 focus:outline-none active:duration-75 hover:shadow-[2px_2px_8px_2px_rgba(0,0,0,0.3)] dark:hover:shadow-[2px_2px_8px_2px_rgba(255,255,255,0.25)] transition-shadow duration-300"
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