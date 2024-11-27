// components/Logo.tsx
import Link from 'next/link';
import React from 'react';

const Logo: React.FC = () => {
  return (
<div className="group relative flex flex-col items-start mb-10" aria-label="Homepage - Oleksandr Pryvalov Paintings">
  <Link
    href="/"
    className="absolute top-[1.9rem] left-0 font-nunito text-2xl tracking-widest uppercase cursor-pointer z-10"
  >
    <div className="py-[0px] px-[5px] bg-white">
      <span
        className="block text-[10px] py-[4px]"
        style={{ lineHeight: '0.8' }}
      >
        Oleksandr
      </span>
      <span
        className="block text-[11px] font-extrabold"
        style={{ lineHeight: '0.8' }}
      >
        Pryvalov
      </span>
    </div>
  </Link>
  <Link href="/" className="relative">
    <span className="font-cinzel text-8xl leading-none block">O</span>
    <span className="absolute font-cinzel text-8xl leading-none bottom-[10%] left-1/2 transform -translate-x-[30%] translate-y-[33%]">
      P
    </span>
  </Link>
</div>
  );
};

export default Logo;