'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaInstagram } from 'react-icons/fa';
import { usePainting } from '../context/PaintingContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentPainting, goToPrevious, goToNext } = usePainting();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:p-2 focus:bg-blue-500 focus:text-white"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      <aside className="w-64 p-10 flex flex-col justify-between" aria-label="Sidebar Navigation">
        <nav className="space-y-8">
          <div className="space-y-1">
            <Link
              href="/"
              className="uppercase text-3xl hover:text-gray-500 transition-colors font-playfair"
              aria-label="Homepage - Oleksandr Pryvalov Paintings"
            >
              <h1>Oleksandr <br /> Pryvalov</h1>
            </Link>
            <p className="text-darkGold text-lg italic font-medium tracking-widest font-playfair">paintings</p>
          </div>
          <div className="text-base space-y-1 flex flex-col font-bold text-gray-700">
            <Link href="/about" className="hover:text-gray-900 hover:underline transition-all font-nunito uppercase">
              About
            </Link>
            <Link href="/contact" className="hover:text-gray-900 hover:underline transition-all font-nunito uppercase">
              Contact
            </Link>
            <Link
              href="https://www.instagram.com/oleksandrpryv/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile - Oleksandr Pryvalov"
              className="w-fit"
            >
              <FaInstagram className="text-s text-gray-700 hover:text-gray-900 transition-colors" aria-hidden="true" />
            </Link>
          </div>
        </nav>
        {pathname === '/' && currentPainting && (
          <div className="mt-auto mb-8">
            <h2 className="text-xl font-bold mb-1 font-nunito">
              {currentPainting.title}
            </h2>
            <p className="text-sm font-nunito">{currentPainting.dimensions}</p>
            <p className="text-sm font-nunito">{currentPainting.year}</p>
            <div className="mt-2 text-sm">
              <button onClick={goToPrevious} className="hover:underline font-nunito font-bold">
                PREV
              </button>
              <span className="mx-1 font-nunito font-bold">/</span>
              <button onClick={goToNext} className="hover:underline font-nunito font-bold">
                NEXT
              </button>
            </div>
          </div>
        )}
        <footer className="text-xs font-nunito text-slate-500">
          © 2024 by Oleksandr rubenko
        </footer>
      </aside>
      <main id="main-content" className="flex-1 py-10 px-10 overflow-x-auto">
        {children}
      </main>
    </div>
  );
}

// The `use client` directive is not needed for this component to function
