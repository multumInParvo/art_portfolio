"use client"

import type React from "react"
import Link from "next/link"
import { FaInstagram } from "react-icons/fa"
import { Moon, Sun } from "lucide-react"

interface DesktopSidebarProps {
  pathname: string
  translations: any
  theme: string
  toggleTheme: () => void
  language: string
  toggleLanguage: () => void
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  pathname,
  translations,
  theme,
  toggleTheme,
  language,
  toggleLanguage,
}) => {
  return (
    <aside className="hidden md:flex flex-col justify-between w-64 fixed h-full bg-white dark:bg-gray-900 pl-12 pt-14 pb-8 z-50">
      <div className="space-y-8">
        <Link href="/home" className="block w-fit text-xl font-bold">
          Oleksandr Pryvalov
        </Link>
        <nav className="space-y-4">
          <Link href="/home?view=paintings" className="block font-nunito relative w-fit">
            <span className="relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gray-800 dark:after:bg-gray-200 after:transition-transform after:duration-300 hover:after:scale-x-100">
              {translations.paintings}
            </span>
          </Link>
          <Link href="/about" className="block font-nunito relative w-fit">
            <span className="relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gray-800 dark:after:bg-gray-200 after:transition-transform after:duration-300 hover:after:scale-x-100">
              {translations.about}
            </span>
          </Link>
          <Link href="/contact" className="block font-nunito relative w-fit">
            <span className="relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gray-800 dark:after:bg-gray-200 after:transition-transform after:duration-300 hover:after:scale-x-100">
              contact
            </span>
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link
            href="https://www.instagram.com/oleksandr.pryvalov.art/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile - Oleksandr Pryvalov"
            className="transition-opacity duration-200 hover:opacity-70"
          >
            <FaInstagram className="w-4 h-4" />
          </Link>
          <button
            onClick={toggleLanguage}
            aria-label={translations.switch_language}
            className="w-min text-sm transition-opacity duration-200 hover:opacity-70"
          >
            {language}
          </button>
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="w-min transition-opacity duration-200 hover:opacity-70"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </aside>
  )
}

export default DesktopSidebar

