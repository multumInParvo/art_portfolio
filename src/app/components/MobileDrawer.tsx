"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

const MobileDrawer: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 p-4 z-50 shadow-md">
      <div className="flex justify-between items-center">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-md p-4 space-y-4">
          <Link href="/home" className="block" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link href="/home?view=paintings" className="block" onClick={() => setIsMenuOpen(false)}>
            Paintings
          </Link>
          <Link href="/about" className="block" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <Link href="/contact" className="block" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default MobileDrawer;
