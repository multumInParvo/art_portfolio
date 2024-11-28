import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext'; 

const Logo: React.FC = () => {
  const { theme } = useTheme(); 
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  if (!isClient) {
    return null; 
  }
  const logoSrc = theme === 'dark' ? '/logo_light.svg' : '/logo_dark.svg';

  return (
    <div className="group relative flex flex-col items-start mb-10" aria-label="Homepage - Oleksandr Pryvalov Paintings">
      <Link href="/" className="relative">
        <img src={logoSrc} alt="Logo" className="w-auto h-[75]" />
      </Link>
    </div>
  );
};

export default Logo;
