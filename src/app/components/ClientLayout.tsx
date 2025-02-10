"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation"; // Ensure this import is present
import DesktopSidebar from "./DesktopSidebar";
import MobileDrawer from "./MobileDrawer";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import en from "../translations/en.json";
import fr from "../translations/fr.json";
import { gsap } from "gsap";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname(); // Ensure this works
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const translations = language === "EN" ? en : fr;

  const mainRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      mainRef.current,
      { opacity: 0.5 },
      { opacity: 1, duration: 0.8, ease: "power1.out" }
    );
  }, []);

  return (
    <div className="flex min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:p-2 focus:bg-blue-500 focus:text-white"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      {/* Desktop Sidebar */}
      <DesktopSidebar
        pathname={pathname}
        translations={translations}
        theme={theme}
        toggleTheme={toggleTheme}
        language={language}
        toggleLanguage={toggleLanguage}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        translations={translations}
        theme={theme}
        toggleTheme={toggleTheme}
        language={language}
        toggleLanguage={toggleLanguage}
      />

      {/* Main Content */}
      <main ref={mainRef} id="main-content" className="flex-1 p-5 md:py-10 md:pl-64 md:pr-10">
        {children}
      </main>
    </div>
  );
}
