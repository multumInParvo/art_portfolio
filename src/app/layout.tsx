// app/layout.tsx
import { Playfair_Display, Nunito } from 'next/font/google';
import './globals.css';
import { PaintingProvider } from './context/PaintingContext';
import { ThemeProvider } from '../app/context/ThemeContext';
import ClientLayout from '../app/components/ClientLayout';

export const metadata = {
  title: 'Oleksandr Pryvalov',
  description: 'My personal art portfolio',
  icons: {
    icon: '/favicon.ico',
  },
};

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${nunito.variable}`}>
      <body>
        <ThemeProvider>
          <PaintingProvider>
            <ClientLayout isLoading={false}>{children}</ClientLayout>
          </PaintingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
