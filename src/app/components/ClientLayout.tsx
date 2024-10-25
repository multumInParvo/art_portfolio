'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import PaintingDetails from './PaintingDetails';

export default function ClientLayout({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:p-2 focus:bg-blue-500 focus:text-white"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      {/* Aside Navigation for Desktop */}
      <aside className="hidden md:flex md:w-64 md:flex-shrink-0 md:flex-col">
        <div className="p-10 flex flex-col h-full md:pr-0">
          <div>
            <Link
              href="/"
              className="block uppercase text-2xl md:text-3xl hover:text-gray-500 transition-colors"
              aria-label="Homepage - Oleksandr Pryvalov Paintings"
            >
              <h1 className="font-nunito font-semibold whitespace-nowrap md:whitespace-normal">
                Oleksandr Pryvalov
              </h1>
            </Link>
            <div className="mt-1">
              <Link
                href="/thumbnails"
                className="text-darkGold text-lg italic font-medium tracking-widest font-playfair hover:underline"
              >
                paintings
              </Link>
            </div>
            <nav className="mt-10 space-y-1">
              <div className="text-base flex flex-col font-bold text-gray-700 space-y-4">
                <Link
                  href="/about"
                  className="hover:text-gray-900 hover:underline transition-all font-nunito uppercase w-full"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="hover:text-gray-900 hover:underline transition-all font-nunito uppercase w-full"
                >
                  Contact
                </Link>
                <Link
                  href="https://www.instagram.com/oleksandrpryv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile - Oleksandr Pryvalov"
                  className="w-fit"
                >
                  <FaInstagram
                    className="text-lg text-gray-700 hover:text-gray-900 transition-colors"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </nav>
          </div>
          <div className="mt-auto">
            {pathname === '/' && !isLoading && <PaintingDetails />}
            <div className="mt-8">
              <footer className='text-xs font-nunito text-slate-500'>
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
            <Link
              href="/"
              className="block uppercase text-2xl hover:text-gray-500 transition-colors"
              aria-label="Homepage - Oleksandr Pryvalov Paintings"
            >
              <h1 className="font-nunito font-semibold">
                Oleksandr<br className="hidden max-[350px]:block" /> Pryvalov
              </h1>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-1">
            <span className="text-base italic from-neutral-200 tracking-widest font-playfair">
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
                  <div className="w-fit">
                    <Link
                      href="/about"
                      className="text-gray-700 hover:text-gray-900 hover:underline transition-all font-nunito uppercase"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About
                    </Link>
                  </div>
                  <div className="w-fit">
                    <Link
                      href="/contact"
                      className="text-gray-700 hover:text-gray-900 hover:underline transition-all font-nunito uppercase"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </div>
                  <div className="w-fit">
                    <Link
                      href="https://www.instagram.com/oleksandrpryv/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram Profile - Oleksandr Pryvalov"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaInstagram
                        className="text-lg text-gray-700 hover:text-gray-900 transition-colors"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main id="main-content" className="flex-1 p-5 md:py-10 md:pr-10 md:pl-0">
          <div className="min-w-max">
            {children}</div>
        </main>

        {/* Mobile Footer */}
        <div className="p-5 md:hidden">
          <footer className='text-xs font-nunito text-slate-500'>
            © 2024 by Oleksandr Pryvalov
          </footer>
        </div>
      </div>
    </div>
  );
}