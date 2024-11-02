// app/layout.tsx
import { Playfair_Display, Nunito } from 'next/font/google';
import './globals.css';
import { PaintingProvider } from './context/PaintingContext';
import { ThemeProvider } from '../app/context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import LayoutWrapper from './components/LayoutWrapper';

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
          <LanguageProvider>
            <LayoutWrapper isLoading={false}>{children}</LayoutWrapper>
            </LanguageProvider>
          </PaintingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
