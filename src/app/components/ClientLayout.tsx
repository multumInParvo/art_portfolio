'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Moon, Sun } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import PaintingDetails from './PaintingDetails';
import { useTheme } from '../context/ThemeContext';
import ScrollArrows from '../components/ScrollArrows';
import { useLanguage } from '../context/LanguageContext';

export default function ClientLayout({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white dark:bg-gray-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:p-2 focus:bg-blue-500 focus:text-white"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      {/* Aside Navigation for Desktop */}
      <aside className="hidden md:flex md:w-64 md:flex-shrink-0 md:flex-col 
        bg-white dark:bg-gray-900 dark:border-gray-800">
        <div className="p-10 flex flex-col h-full md:pr-0">
          <div>
            <h1 className="block uppercase text-2xl md:text-3xl font-playfair whitespace-nowrap md:whitespace-normal">
              <Link
                href="/"
                className="text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                aria-label="Homepage - Oleksandr Pryvalov Paintings"
              >
                Oleksandr Pryvalov
              </Link>
            </h1>

            <div>
              <Link href="/thumbnails"
                className="text-darkGold dark:text-amber-400 text-base italic font-medium tracking-widest font-playfair relative inline-block
                after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:scale-x-0
                dark:after:bg-darkGold after:bg-transparent after:transition-transform after:duration-300
                hover:after:scale-x-100">
                paintings
              </Link>
            </div>

            <nav className="mt-10 space-y-1">
              <div className="text-base flex flex-col font-bold text-gray-700 space-y-4">
                <div className="relative">
                  <Link
                    href="/about"
                    className="text-gray-700 dark:text-gray-100 transition-all font-nunito uppercase inline-block relative
                    after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:scale-x-0 
                    after:bg-gray-700 dark:after:bg-darkGold after:transition-transform after:duration-300 
                    hover:after:scale-x-100"
                  >
                    About
                  </Link>
                </div>

                <div className="relative">
                  <Link
                    href="/contact"
                    className="text-gray-700 dark:text-gray-100 transition-all font-nunito uppercase inline-block relative
                    after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:scale-x-0 
                    after:bg-gray-700 dark:after:bg-darkGold after:transition-transform after:duration-300 
                    hover:after:scale-x-100"
                  >
                    Contact
                  </Link>
                </div>

                <div className='flex gap-6'>
                  <Link
                    href="https://www.instagram.com/oleksandrpryv/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Profile - Oleksandr Pryvalov"
                    className="flex items-center justify-center rounded-full w-8 h-8
                    bg-gray-100 dark:bg-gray-800 
                    text-gray-700 dark:text-gray-200
                    hover:bg-gray-200 dark:hover:bg-gray-700
                    transition-colors duration-200 
                    focus:outline-none focus:ring-2 
                    focus:ring-darkGold"
                  >
                    <FaInstagram
                      className="text-lg text-gray-700 dark:text-gray-100 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                      aria-hidden="true"
                    />
                  </Link>

                  <button
                    onClick={toggleLanguage}
                    className="rounded-full w-8 h-8
                  bg-gray-100 dark:bg-gray-800 
                  text-gray-700 dark:text-gray-200
                  hover:bg-gray-200 dark:hover:bg-gray-700
                  transition-colors duration-200 
                  focus:outline-none focus:ring-2 
                  focus:ring-darkGold
                  text-sm font-medium"
                    aria-label={`Switch to ${language === 'EN' ? 'French' : 'English'} language`}
                  >
                    {language}
                  </button>

                  <button
                    onClick={toggleTheme}
                    className="flex justify-center items-center rounded-full w-8 h-8
                  bg-gray-100 dark:bg-gray-800 
                  text-gray-700 dark:text-gray-200
                  hover:bg-gray-200 dark:hover:bg-gray-700
                  transition-colors duration-200 
                  focus:outline-none focus:ring-2 
                  focus:ring-darkGold"
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                  >
                    {theme === 'light' ? (
                      <Moon className="w-5 h-5" />
                    ) : (
                      <Sun className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </nav>
          </div>
          <div className="mt-auto">
            {pathname === '/' && !isLoading && <PaintingDetails />}
            <div className="mt-8">
              <footer className='text-xs font-nunito text-gray-600 dark:text-gray-100'>
                © 2024 by Oleksandr Pryvalov
              </footer>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Layout */}
      <div className="w-full md:flex-1">
        {/* Mobile Header */}
        <div className="md:hidden p-5 pb-0">
          <div className="flex justify-between items-center max-[350px]:items-start">
            <h1 className="block uppercase text-2xl font-playfair">
              <Link
                href="/"
                className="text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                aria-label="Homepage - Oleksandr Pryvalov Paintings"
              >
                Oleksandr<br className="hidden max-[350px]:block" /> Pryvalov
              </Link>
            </h1>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden dark:text-gray-200"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          <div>
            <span className="text-base text-slate-700 italic tracking-widest font-playfair dark:text-amber-400">
              paintings
            </span>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className="md:hidden">
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-64' : 'max-h-0'
              }`}
          >
            <div className="p-5 pt-0">
              <nav className="space-y-6 mt-8">
                <div className="text-sm space-y-4 flex flex-col font-bold">
                  <div className="relative">
                    <Link
                      href="/about"
                      className="text-gray-700 dark:text-gray-100 font-nunito uppercase inline-block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About
                    </Link>
                  </div>
                  <div className="relative">
                    <Link
                      href="/contact"
                      className="text-gray-700 dark:text-gray-100 font-nunito uppercase inline-block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </div>
                  <div className="flex gap-6">
                    <Link
                      href="https://www.instagram.com/oleksandrpryv/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram Profile - Oleksandr Pryvalov"
                      className="flex items-end"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaInstagram
                        className="text-lg text-gray-700 dark:text-gray-100 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                        aria-hidden="true"
                      />
                    </Link>
                    <button
                      onClick={toggleTheme}
                      className="rounded-full 
                      bg-gray-100 dark:bg-gray-800 
                      text-gray-700 dark:text-gray-200
                      hover:bg-gray-200 dark:hover:bg-gray-700
                      transition-colors duration-200 
                      focus:outline-none focus:ring-2 
                      focus:ring-darkGold"
                      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                      {theme === 'light' ? (
                        <Moon className="w-5 h-5" />
                      ) : (
                        <Sun className="w-5 h-5" />
                      )}
                    </button>
                    <ScrollArrows />
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main id="main-content" className="flex-1 p-5 md:py-10 md:pr-10 md:pl-0">
          <div className="w-full">
            {children}
          </div>
        </main>

        {/* Mobile Footer */}
        <div className="p-5 md:hidden">
          <footer className='text-xs font-nunito text-gray-600 dark:text-gray-100'>
            © 2024 by Oleksandr Pryvalov
          </footer>
        </div>
      </div>
    </div>
  );
}