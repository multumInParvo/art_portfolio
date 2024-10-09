// src/app/layout.tsx
import { Cinzel } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Art Portfolio',
  description: 'My personal art portfolio',
};

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'], // Choose the weights you need
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          {/* Left Side Menu */}
          <aside className='w-1/4 p-10 flex flex-col'>

            <div className="h-1/2 space-y-8">
              <div className='space-y-1'>
                <Link href="/" className="uppercase font-cinzel text-3xl text-gray-700">Oleksandr <br /> Pryvalov</Link>
                <p className="text-gray-600 italic font-cinzel tracking-widest">paintings</p>
              </div>
              <div className="text-lg flex flex-col space-y-2">
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </div>

            <div className="flex flex-col justify-end items-start h-1/2 space-y-3">
              <h2 id="paintingTitle" className="text-xl font-semibold font-cinzel text-gray-700"></h2>
              <div className='text-sm'>
                <p id="paintingDescription"></p>
                <p id="paintingDimensions"></p>
                <p id="paintingYear"></p>
              </div>
            </div>

          </aside>

          {/* Right Side Content */}
          <main className="p-10 w-3/4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
