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
          <aside className="w-1/4 p-8 fixed h-full left-0 top-0">
            <div className="space-y-8">
              <Link href="/" className="text-2xl font-bold">Oleksandr Pryvalov</Link>
              <div className="text-lg">
                <p className="text-gray-500">Paintings</p>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </div>
          </aside>

          {/* Right Side Content */}
          <main className="ml-1/4 p-8 w-3/4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
