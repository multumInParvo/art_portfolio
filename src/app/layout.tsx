// src/app/layout.tsx
import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Art Portfolio',
  description: 'My personal art portfolio',
};

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
              <Link href="/" className="text-2xl font-bold uppercase">Oleksandr <br /> Pryvalov</Link>
              <div className="text-lg flex flex-col">
                <p className="text-gray-500">Paintings</p>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </div>

            <div className="flex flex-col justify-end items-start h-1/2 space-y-4">
              <h2 id="paintingTitle" className="text-xl font-semibold"></h2>
              <p id="paintingDescription" className="text-sm"></p>
              <p id="paintingDimensions" className="text-sm"></p>
              <p id="paintingYear" className="text-sm"></p>
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
