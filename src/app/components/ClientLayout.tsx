'use client';

import Link from 'next/link';
import PaintingDetails from './PaintingDetails';
import { usePathname } from 'next/navigation';
import { FaInstagram } from 'react-icons/fa'; // Import Instagram icon from react-icons

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Skip link for better keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      {/* Left Side Menu */}
      <aside className="w-64 p-10 flex flex-col justify-between" aria-label="Sidebar Navigation">
        <nav className="space-y-8">
          <div className="space-y-1">
            <Link
              href="/"
              className="uppercase font-cinzel text-3xl text-gray-700"
              aria-label="Homepage - Oleksandr Pryvalov Paintings"
            >
              Oleksandr <br /> Pryvalov
            </Link>
            <p className="text-gray-600 italic font-cinzel tracking-widest">paintings</p>
          </div>
          <div className="text-lg flex flex-col space-y-2 font-semibold text-gray-700">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link
              href="https://www.instagram.com/oleksandrpryv/"
              target="_blank"
              aria-label="Instagram Profile - Oleksandr Pryvalov"
            >
              <FaInstagram
                className="text-s text-gray-700 hover:text-gray-900"
                aria-hidden="true"
              />
            </Link>
          </div>
        </nav>
        {pathname === '/' && <PaintingDetails />}
      </aside>

      {/* Right Side Content */}
      <main id="main-content" className="flex-1 py-10 pr-10 overflow-x-auto">
        <div className="min-w-max">{children}</div>
      </main>
    </div>
  );
}
