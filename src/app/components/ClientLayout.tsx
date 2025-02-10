"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import DesktopSidebar from "./DesktopSidebar"
import MobileDrawer from "./MobileDrawer"
import { useTheme } from "../context/ThemeContext"
import { useLanguage } from "../context/LanguageContext"
import en from "../translations/en.json"
import fr from "../translations/fr.json"
import { gsap } from "gsap"

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const translations = language === "EN" ? en : fr

  const mainRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(mainRef.current, { opacity: 0.5 }, { opacity: 1, duration: 0.8, ease: "power1.out" })
  }, [])

  const isMainPage = pathname === "/"

  return (
    <div className="flex min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:p-2 focus:bg-blue-500 focus:text-white"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      {/* Desktop Sidebar - Always visible */}
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
      <main
        ref={mainRef}
        id="main-content"
        className={`flex-1 ${isMainPage ? "ml-64" : "p-5 md:py-10 md:pr-10 md:pl-74"}`}
      >
        {children}
      </main>


    </div>
  )
}

