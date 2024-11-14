'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DesktopSidebar from '../components/DesktopSidebar';
import { Menu, Moon, Sun } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import ScrollArrows from '../components/ScrollArrows';
import { useLanguage } from '../context/LanguageContext';
import en from '../translations/en.json';
import fr from '../translations/fr.json';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const translations = language === 'EN' ? en : fr;

  // Check if current path is `/image-viewer` to determine if sidebar should be shown
  const showSidebar = pathname !== '/image-viewer';

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white dark:bg-gray-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:p-2 focus:bg-blue-500 focus:text-white"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      {/* Desktop Sidebar */}
      {showSidebar && (
        <DesktopSidebar
          showPaintingDetails={pathname === '/'}
          pathname={pathname}
          translations={translations}
          theme={theme}
          toggleTheme={toggleTheme}
          language={language}
          toggleLanguage={toggleLanguage}
        />
      )}

      {/* Mobile Layout */}
      <div className="w-full md:flex-1">
        {/* Mobile Header */}
        <div className="md:hidden p-5 pb-0">
          <div className="flex justify-between items-center max-[350px]:items-start">
            <h1 className="block text-2xl font-nunito">
              <Link
                href="/"
                className="text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                aria-label="Homepage - Oleksandr Pryvalov Paintings"
              >
                oleksandr<br className="hidden max-[350px]:block" /> pryvalov
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
            <span className="text-sm text-slate-700 tracking-widest font-playfair dark:text-amber-400">
              {translations.paintings}
            </span>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className="md:hidden">
          <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-64' : 'max-h-0'}`}>
            <div className="p-5 pt-0">
              <nav className="space-y-6 mt-8">
                <div className="text-sm space-y-4 flex flex-col font-bold">
                  <div className="relative">
                    <Link
                      href="/about"
                      className="text-gray-700 dark:text-gray-100 font-nunito inline-block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {translations.about}
                    </Link>
                  </div>
                  <div className="relative">
                    <Link
                      href="/contact"
                      className="text-gray-700 dark:text-gray-100 font-nunito inline-block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      contact
                    </Link>
                  </div>
                  <div className='flex items-center gap-3 mt-5'>
                    <Link
                      href="https://www.instagram.com/oleksandrpryv/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram Profile - Oleksandr Pryvalov"
                      className="flex items-center justify-center rounded-full w-5 h-5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-darkGold"
                    >
                      <FaInstagram className="text-base text-gray-700 dark:text-gray-100 hover:text-gray-900 dark:hover:text-gray-200 transition-colors" aria-hidden="true" />
                    </Link>

                    <button
                      onClick={toggleLanguage}
                      className="rounded-full w-5 h-5 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-darkGold text-xs font-medium"
                      aria-label={translations.switch_language}
                    >
                      {language}
                    </button>

                    <button
                      onClick={toggleTheme}
                      className="rounded-full w-5 h-5 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-darkGold"
                      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                      {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main
          id="main-content"
          className={`flex-1 ${pathname === '/image-viewer' ? '' : 'p-5 md:py-10 md:pr-10 md:pl-10'}`}
        >
          <div>{children}</div>
        </main>

        {/* Add ScrollArrows for Mobile */}
        <div className="md:hidden">
          <ScrollArrows />
        </div>

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
