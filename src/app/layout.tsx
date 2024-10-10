import { Cinzel } from 'next/font/google';
import './globals.css';
import { PaintingProvider } from './context/PaintingContext';
import ClientLayout from '../app/components/ClientLayout';

export const metadata = {
  title: 'Art Portfolio',
  description: 'My personal art portfolio',
};

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cinzel.className}>
        <PaintingProvider>
          <ClientLayout>{children}</ClientLayout>
        </PaintingProvider>
      </body>
    </html>
  );
}