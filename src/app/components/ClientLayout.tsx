'use client';

import Link from 'next/link';
import PaintingDetails from './PaintingDetails';
import { usePathname } from 'next/navigation';
import { FaInstagram } from 'react-icons/fa';

export default function ClientLayout({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) {
  const pathname = usePathname();

  return (
    <div className="p-5 flex flex-col md:flex-row min-h-screen md:p-0">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:p-2 focus:bg-blue-500 focus:text-white"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      <aside className="w-full md:w-64 md:p-10 flex flex-col justify-between" aria-label="Sidebar Navigation">
        <nav className="space-y-8">
          <div className="space-y-1">
            <Link
              href="/"
              className="block uppercase text-2xl md:text-3xl hover:text-gray-500 transition-colors font-playfair"
              aria-label="Homepage - Oleksandr Pryvalov Paintings"
            >
              <h1 className="whitespace-nowrap md:whitespace-normal">
                Oleksandr Pryvalov
              </h1>
            </Link>
            <div className="md:hidden">
              <span className="text-darkGold text-lg italic font-medium tracking-widest font-playfair">
                paintings
              </span>
            </div>
            <div className="hidden md:block">
              <Link
                href="/thumbnails"
                className="text-darkGold text-lg italic font-medium tracking-widest font-playfair hover:underline"
              >
                paintings
              </Link>
            </div>
          </div>
          {/* Rest of your code remains the same */}
          <div className="text-base space-y-1 flex flex-col font-bold text-gray-700">
            <Link
              href="/about"
              className="hover:text-gray-900 hover:underline transition-all font-nunito uppercase"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-gray-900 hover:underline transition-all font-nunito uppercase"
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
                className="text-s text-gray-700 hover:text-gray-900 transition-colors"
                aria-hidden="true"
              />
            </Link>
          </div>
        </nav>
        <div>
          {pathname === '/' && !isLoading && <PaintingDetails />}
          <div className="mt-8 hidden md:block">
            <footer className='mt-8 text-xs font-nunito text-slate-500'>
              © 2024 by Oleksandr Pryvalov
            </footer>
          </div>
        </div>
      </aside>
      <main id="main-content" className="flex-1 p-0 md:py-10 md:pr-10">
        <div className="min-w-max">{children}</div>
      </main>
      <div className="p-0 md:hidden">
        <footer className='mt-8 text-xs font-nunito text-slate-500'>
          © 2024 by Oleksandr Pryvalov
        </footer>
      </div>
    </div>
  );
}