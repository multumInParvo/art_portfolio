'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="text-xs font-nunito p-5 md:p-0 md:mt-8">
      <Link href="https://oleksandrpryvalov.com/" target="_blank" rel="noopener noreferrer">
        © 2024 by Oleksandr Pryvalov
      </Link>
    </footer>
  );
};

export default Footer;
