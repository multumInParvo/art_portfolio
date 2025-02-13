"use client"

import type React from "react"
import Link from "next/link"
import { FaInstagram } from "react-icons/fa"

const DesktopSidebar: React.FC = () => {
  return (
    <aside className="hidden md:flex flex-col justify-between w-64 fixed h-full bg-white dark:bg-gray-900 pl-12 pt-16 pb-8 pr-4 z-50">
      <div className="space-y-8">
        <Link href="/" className="block w-fit text-2xl">
          Oleksandr Pryvalov
        </Link>
        <nav className="space-y-4">
          <Link href="/?view=paintings" className="block font-nunito relative w-fit">
            <span className="relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gray-800 dark:after:bg-gray-200 after:transition-transform after:duration-300 hover:after:scale-x-100">
              Paintings
            </span>
          </Link>
          <Link href="/about" className="block font-nunito relative w-fit">
            <span className="relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gray-800 dark:after:bg-gray-200 after:transition-transform after:duration-300 hover:after:scale-x-100">
              About
            </span>
          </Link>
          <Link href="/contact" className="block font-nunito relative w-fit">
            <span className="relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gray-800 dark:after:bg-gray-200 after:transition-transform after:duration-300 hover:after:scale-x-100">
              Contact
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
        </div>
      </div>
    </aside>
  )
}

export default DesktopSidebar

