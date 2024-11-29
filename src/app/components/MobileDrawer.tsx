'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, Moon, Sun } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import Image from 'next/image';

type MobileDrawerProps = {
  translations: {
    paintings: string;
    about: string;
    switch_language: string;
  };
  theme: string;
  toggleTheme: () => void;
  language: string;
  toggleLanguage: () => void;
};

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  translations,
  theme,
  toggleTheme,
  language,
  toggleLanguage,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  const handleDrawerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'A' && target.tagName !== 'BUTTON') {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const showMenu = pathname !== '/image-viewer';
  const showNav = pathname !== '/image-viewer';
  const showLogo = pathname !== '/image-viewer';

  return (
    <div className="md:hidden" ref={menuRef}>
      {/* Mobile Header */}
      <div className={`pb-0 ${pathname === '/image-viewer' ? 'p-0' : 'p-5'}`}>
        <div className="flex justify-between items-center max-[350px]:items-start">
          {showLogo && (
            <Link
              href="/"
              aria-label="Homepage - Oleksandr Pryvalov Paintings"
              className="flex items-center"
            >
              <Image
                src="/vector.svg"
                alt="Oleksandr Pryvalov Logo"
                width={150} // Adjust width as needed
                height={50} // Adjust height as needed
                priority
                className="h-auto w-auto"
              />
            </Link>
          )}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden dark:text-gray-200"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {showMenu && <Menu className="h-8 w-8 stroke-1" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-64' : 'max-h-0'
        }`}
        onClick={handleDrawerClick}
      >
        <div className="p-5 pt-0">
          {showNav && (
            <nav className="space-y-6 mt-8">
              <div className="text-sm space-y-4 flex flex-col font-bold">
                <div className="relative">
                  <Link
                    href="/about"
                    className="font-nunito inline-block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {translations.about}
                  </Link>
                </div>
                <div className="relative">
                  <Link
                    href="/contact"
                    className="font-nunito inline-block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    contact
                  </Link>
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <Link
                    href="https://www.instagram.com/oleksandr.pryvalov.art/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Profile - Oleksandr Pryvalov"
                    className="flex items-center justify-center rounded-full w-5 h-5 focus:outline-none focus:ring-2 focus:ring-darkGold"
                  >
                    <FaInstagram className="text-base" aria-hidden="true" />
                  </Link>

                  <button
                    onClick={toggleLanguage}
                    className="rounded-full w-5 h-5 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-darkGold text-xs font-medium"
                    aria-label={translations.switch_language}
                  >
                    {language}
                  </button>

                  <button
                    onClick={toggleTheme}
                    className="rounded-full w-5 h-5 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-darkGold"
                    aria-label={`Switch to ${
                      theme === 'light' ? 'dark' : 'light'
                    } mode`}
                  >
                    {theme === 'light' ? (
                      <Moon className="w-4 h-4" />
                    ) : (
                      <Sun className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
