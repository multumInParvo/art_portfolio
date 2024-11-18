'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import DesktopSidebar from '../components/DesktopSidebar';
import Footer from '../components/Footer';
import MobileDrawer from '../components/MobileDrawer';
import ScrollArrows from '../components/ScrollArrows';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import en from '../translations/en.json';
import fr from '../translations/fr.json';

interface ClientLayoutProps {
  children: React.ReactNode;
  isLoading: boolean;
}

export default function ClientLayout({ children, isLoading }: ClientLayoutProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const translations = language === 'EN' ? en : fr;

  const showSidebar = pathname !== '/image-viewer';
  const showFooter = pathname !== '/image-viewer';

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white dark:bg-gray-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:p-2 focus:bg-blue-500 focus:text-white"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      {/* Desktop Sidebar */}
      {showSidebar && (
        <DesktopSidebar
          showPaintingDetails={pathname === '/'}
          pathname={pathname}
          translations={translations}
          theme={theme}
          toggleTheme={toggleTheme}
          language={language}
          toggleLanguage={toggleLanguage}
        />
      )}

      {/* Mobile Drawer */}
      <MobileDrawer
        translations={translations}
        theme={theme}
        toggleTheme={toggleTheme}
        language={language}
        toggleLanguage={toggleLanguage}
      />

      {/* Main Content */}
      <main id="main-content" className={`flex-1 ${pathname === '/image-viewer' ? '' : 'p-5 md:py-10 md:pr-10 md:pl-10'}`}>
        {children}
      </main>

      {/* ScrollArrows for Mobile */}
      <div className="md:hidden">
        <ScrollArrows />
      </div>
      {showFooter && (
        <div className="md:hidden">
          <Footer />
        </div>
      )}
    </div>
  );
}
