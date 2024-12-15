'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, Moon, Sun } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';

type MobileDrawerProps = {
  translations: {
    paintings: string;
    about: string;
    exhibitions: string;
    switch_language: string;
  };
  theme: string;
  toggleTheme: () => void;
  language: string;
  toggleLanguage: () => void;
};

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  translations,
  theme,
  toggleTheme,
  language,
  toggleLanguage,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  const handleDrawerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'A' && target.tagName !== 'BUTTON') {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const showMenu = pathname !== '/image-viewer';
  const showNav = pathname !== '/image-viewer';
  const showLogo = pathname !== '/image-viewer';

  return (
    <div className="md:hidden" ref={menuRef}>
      {/* Mobile Header */}
      <div className={`pb-0 ${pathname === '/image-viewer' ? 'p-0' : 'p-5'}`}>
        <div className="flex justify-between items-center max-[350px]:items-start">
          {showLogo && (
            <Link
              href="/"
              aria-label="Homepage - Oleksandr Pryvalov Paintings"
              className="flex items-center"
            >
              <svg width="134" height="63" viewBox="0 0 134 63" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.728 16.112C14.5573 15.5573 14.472 15.088 14.472 14.704C14.472 14.2773 14.4933 13.808 14.536 13.296C14.5786 12.784 14.664 12.08 14.792 11.184C14.9626 10.288 15.2613 9.41333 15.688 8.56C16.1146 7.664 16.6053 6.81067 17.16 6C17.7146 5.18933 18.4186 4.44266 19.272 3.76C20.168 3.07733 21.1493 2.48 22.216 1.968C24.4773 0.858664 27.2293 0.303997 30.472 0.303997C37 0.303997 42.312 2.48 46.408 6.832C50.5466 11.1413 52.616 16.6667 52.616 23.408C52.616 30.1493 50.184 35.76 45.32 40.24C40.456 44.6773 34.2906 46.896 26.824 46.896C19.3573 46.896 13.1493 44.6773 8.19997 40.24C3.2933 35.8027 0.839966 30.0427 0.839966 22.96C0.839966 18.3947 1.90663 14.3413 4.03997 10.8C6.1733 7.25867 9.22397 4.48533 13.192 2.48L13.576 3.056C10.8026 4.89067 8.7973 7.536 7.55997 10.992C6.3653 14.448 5.76797 18.1173 5.76797 22C5.76797 29.2107 7.73063 34.8427 11.656 38.896C15.5813 42.9493 20.616 44.976 26.76 44.976C32.904 44.976 37.9173 42.9493 41.8 38.896C45.7253 34.8 47.688 29.424 47.688 22.768C47.688 17.008 46.1306 12.144 43.016 8.176C39.944 4.208 35.592 2.224 29.96 2.224C27.4426 2.224 25.16 2.672 23.112 3.568C19.4 5.14666 16.9466 7.74933 15.752 11.376C15.4106 12.4427 15.24 13.36 15.24 14.128C15.24 14.896 15.2826 15.5147 15.368 15.984L14.728 16.112Z" fill="currentColor" />
                <path d="M33.528 17.176C37.24 17.176 40.3333 18.072 42.808 19.864C46.136 22.2533 47.8 25.9867 47.8 31.064C47.8 34.7333 46.776 37.8693 44.728 40.472C42.5093 43.2453 39.416 44.632 35.448 44.632C33.3573 44.632 31.4586 44.1413 29.752 43.16C28.0453 42.136 27.0426 40.408 26.744 37.976L27.32 37.784C27.7893 39.6187 28.8773 40.8987 30.584 41.624C31.736 42.136 32.76 42.392 33.656 42.392C37.1546 42.392 39.6933 41.0267 41.272 38.296C42.424 36.2907 43 33.9013 43 31.128C43 26.6907 41.7626 23.4907 39.288 21.528C37.4106 19.992 35.0213 19.224 32.12 19.224C31.4373 19.224 30.84 19.2667 30.328 19.352C29.8586 19.3947 27.7253 19.736 23.928 20.376V58.328C23.9706 59.48 24.3973 60.44 25.208 61.208C26.0186 61.976 26.9573 62.36 28.024 62.36H28.856V63H14.84V62.36H15.672C16.7386 62.36 17.6773 61.976 18.488 61.208C19.2986 60.44 19.7253 59.48 19.768 58.328V23.704C19.768 22.5947 19.448 21.7413 18.808 21.144C18.168 20.504 17.336 20.184 16.312 20.184C16.0986 20.184 15.8853 20.2053 15.672 20.248L14.904 20.312L14.776 19.672C16.9946 19.4587 19.96 19.0533 23.672 18.456C27.4266 17.816 29.752 17.4533 30.648 17.368C31.544 17.24 32.504 17.176 33.528 17.176Z" fill="currentColor" />
                <path d="M63.83 31.09C63.1766 31.09 62.6066 30.9433 62.12 30.65C61.64 30.35 61.2666 29.93 61 29.39C60.74 28.85 60.61 28.21 60.61 27.47C60.61 26.91 60.6833 26.41 60.83 25.97C60.9833 25.5233 61.2 25.1467 61.48 24.84C61.76 24.5267 62.0966 24.2867 62.49 24.12C62.89 23.9467 63.3366 23.86 63.83 23.86C64.4966 23.86 65.07 24.0067 65.55 24.3C66.0366 24.5933 66.41 25.01 66.67 25.55C66.9366 26.0833 67.07 26.72 67.07 27.46C67.07 28.02 66.9933 28.5233 66.84 28.97C66.6866 29.4167 66.47 29.7967 66.19 30.11C65.91 30.4233 65.57 30.6667 65.17 30.84C64.7766 31.0067 64.33 31.09 63.83 31.09ZM63.83 30.36C64.3366 30.36 64.7633 30.2467 65.11 30.02C65.4633 29.7933 65.7333 29.4633 65.92 29.03C66.1066 28.5967 66.2 28.0767 66.2 27.47C66.2 26.5567 65.9933 25.85 65.58 25.35C65.1733 24.8433 64.59 24.59 63.83 24.59C63.3366 24.59 62.9133 24.7033 62.56 24.93C62.2133 25.1567 61.9466 25.4867 61.76 25.92C61.5733 26.3467 61.48 26.8633 61.48 27.47C61.48 28.3767 61.6866 29.0867 62.1 29.6C62.5133 30.1067 63.09 30.36 63.83 30.36Z" fill="currentColor" />
                <path d="M70.656 31C70.5226 31 70.4193 30.9633 70.346 30.89C70.2726 30.81 70.236 30.7033 70.236 30.57V24.33C70.236 24.19 70.2693 24.0833 70.336 24.01C70.4093 23.9367 70.5126 23.9 70.646 23.9C70.7793 23.9 70.8793 23.9367 70.946 24.01C71.0193 24.0833 71.056 24.19 71.056 24.33V30.28H74.336C74.456 30.28 74.5493 30.3133 74.616 30.38C74.6826 30.44 74.716 30.5267 74.716 30.64C74.716 30.7533 74.6826 30.8433 74.616 30.91C74.5493 30.97 74.456 31 74.336 31H70.656Z" fill="currentColor" />
                <path d="M77.8157 31C77.669 31 77.5557 30.9633 77.4757 30.89C77.4023 30.81 77.3657 30.6967 77.3657 30.55V24.4C77.3657 24.2533 77.4023 24.1433 77.4757 24.07C77.5557 23.99 77.669 23.95 77.8157 23.95H81.5357C81.649 23.95 81.7357 23.98 81.7957 24.04C81.8557 24.1 81.8857 24.1833 81.8857 24.29C81.8857 24.4033 81.8557 24.49 81.7957 24.55C81.7357 24.61 81.649 24.64 81.5357 24.64H78.1657V27.08H81.3257C81.439 27.08 81.5257 27.11 81.5857 27.17C81.6457 27.2233 81.6757 27.3067 81.6757 27.42C81.6757 27.5333 81.6457 27.62 81.5857 27.68C81.5257 27.74 81.439 27.77 81.3257 27.77H78.1657V30.31H81.5357C81.649 30.31 81.7357 30.34 81.7957 30.4C81.8557 30.46 81.8857 30.5433 81.8857 30.65C81.8857 30.7633 81.8557 30.85 81.7957 30.91C81.7357 30.97 81.649 31 81.5357 31H77.8157Z" fill="currentColor" />
                <path d="M85.3057 31.07C85.1724 31.07 85.0691 31.0333 84.9958 30.96C84.9291 30.88 84.8957 30.7733 84.8957 30.64V24.3C84.8957 24.16 84.9291 24.0567 84.9958 23.99C85.0691 23.9167 85.1724 23.88 85.3057 23.88C85.4391 23.88 85.5391 23.9167 85.6058 23.99C85.6791 24.0567 85.7157 24.16 85.7157 24.3V27.15H85.7357L88.9958 24.11C89.0758 24.03 89.1557 23.9733 89.2357 23.94C89.3157 23.9 89.4024 23.88 89.4958 23.88C89.6224 23.88 89.7124 23.91 89.7657 23.97C89.8257 24.03 89.8491 24.1033 89.8357 24.19C89.8224 24.2767 89.7757 24.36 89.6957 24.44L86.2857 27.6L86.2957 27.16L89.8558 30.45C89.9558 30.5433 90.0091 30.64 90.0157 30.74C90.0224 30.8333 89.9924 30.9133 89.9258 30.98C89.8658 31.04 89.7724 31.07 89.6457 31.07C89.5457 31.07 89.4591 31.0467 89.3857 31C89.3191 30.96 89.2424 30.8967 89.1557 30.81L85.7357 27.68H85.7157V30.64C85.7157 30.7733 85.6824 30.88 85.6157 30.96C85.5491 31.0333 85.4457 31.07 85.3057 31.07Z" fill="currentColor" />
                <path d="M94.8523 31.09C94.539 31.09 94.2323 31.0633 93.9323 31.01C93.6323 30.9567 93.3523 30.88 93.0923 30.78C92.839 30.68 92.609 30.5533 92.4023 30.4C92.3223 30.34 92.2656 30.2733 92.2323 30.2C92.2056 30.12 92.199 30.0433 92.2123 29.97C92.2323 29.89 92.2656 29.8233 92.3123 29.77C92.3656 29.7167 92.429 29.6867 92.5023 29.68C92.5756 29.6733 92.6556 29.6967 92.7423 29.75C93.0423 29.9633 93.3623 30.12 93.7023 30.22C94.0423 30.3133 94.4256 30.36 94.8523 30.36C95.4523 30.36 95.8956 30.25 96.1823 30.03C96.4756 29.8033 96.6223 29.5067 96.6223 29.14C96.6223 28.84 96.5156 28.6067 96.3023 28.44C96.0956 28.2667 95.7456 28.13 95.2523 28.03L94.2123 27.82C93.5856 27.6867 93.1156 27.47 92.8023 27.17C92.4956 26.8633 92.3423 26.4567 92.3423 25.95C92.3423 25.6367 92.4056 25.3533 92.5323 25.1C92.659 24.84 92.8356 24.62 93.0623 24.44C93.289 24.2533 93.559 24.11 93.8723 24.01C94.1856 23.91 94.5323 23.86 94.9123 23.86C95.3323 23.86 95.7223 23.92 96.0823 24.04C96.449 24.1533 96.779 24.3267 97.0723 24.56C97.1456 24.62 97.1956 24.69 97.2223 24.77C97.249 24.8433 97.2523 24.9167 97.2323 24.99C97.2123 25.0567 97.1756 25.1133 97.1223 25.16C97.0756 25.2067 97.0123 25.2333 96.9323 25.24C96.859 25.2467 96.7756 25.22 96.6823 25.16C96.4156 24.96 96.139 24.8167 95.8523 24.73C95.5656 24.6367 95.249 24.59 94.9023 24.59C94.549 24.59 94.2423 24.6433 93.9823 24.75C93.729 24.8567 93.529 25.0133 93.3823 25.22C93.2423 25.42 93.1723 25.6533 93.1723 25.92C93.1723 26.24 93.269 26.4933 93.4623 26.68C93.6623 26.8667 93.9856 27.0033 94.4323 27.09L95.4723 27.31C96.1456 27.45 96.6423 27.6633 96.9623 27.95C97.289 28.23 97.4523 28.6133 97.4523 29.1C97.4523 29.3933 97.3923 29.6633 97.2723 29.91C97.1523 30.1567 96.979 30.37 96.7523 30.55C96.5256 30.7233 96.2523 30.8567 95.9323 30.95C95.6123 31.0433 95.2523 31.09 94.8523 31.09Z" fill="currentColor" />
                <path d="M100.255 31.07C100.148 31.07 100.062 31.0467 99.9951 31C99.9351 30.9467 99.8985 30.88 99.8851 30.8C99.8785 30.7133 99.8985 30.6167 99.9451 30.51L102.695 24.25C102.755 24.1167 102.825 24.0233 102.905 23.97C102.992 23.91 103.085 23.88 103.185 23.88C103.285 23.88 103.375 23.91 103.455 23.97C103.542 24.0233 103.612 24.1167 103.665 24.25L106.425 30.51C106.478 30.6167 106.498 30.7133 106.485 30.8C106.478 30.8867 106.445 30.9533 106.385 31C106.325 31.0467 106.242 31.07 106.135 31.07C106.015 31.07 105.918 31.04 105.845 30.98C105.772 30.9133 105.712 30.82 105.665 30.7L104.925 28.99L105.325 29.2H101.025L101.435 28.99L100.705 30.7C100.645 30.8267 100.582 30.92 100.515 30.98C100.448 31.04 100.362 31.07 100.255 31.07ZM103.175 24.91L101.565 28.7L101.325 28.51H105.025L104.805 28.7L103.195 24.91H103.175Z" fill="currentColor" />
                <path d="M109.78 31.07C109.654 31.07 109.557 31.0367 109.49 30.97C109.424 30.8967 109.39 30.7933 109.39 30.66V24.3C109.39 24.1667 109.424 24.0633 109.49 23.99C109.557 23.9167 109.644 23.88 109.75 23.88C109.857 23.88 109.934 23.9 109.98 23.94C110.034 23.9733 110.094 24.0367 110.16 24.13L114.52 29.94H114.28V24.28C114.28 24.1533 114.314 24.0567 114.38 23.99C114.447 23.9167 114.544 23.88 114.67 23.88C114.79 23.88 114.88 23.9167 114.94 23.99C115.007 24.0567 115.04 24.1533 115.04 24.28V30.67C115.04 30.7967 115.01 30.8967 114.95 30.97C114.897 31.0367 114.817 31.07 114.71 31.07C114.61 31.07 114.53 31.05 114.47 31.01C114.41 30.97 114.347 30.9067 114.28 30.82L109.93 25.01H110.16V30.66C110.16 30.7933 110.127 30.8967 110.06 30.97C109.994 31.0367 109.9 31.07 109.78 31.07Z" fill="currentColor" />
                <path d="M118.943 31C118.796 31 118.683 30.9633 118.603 30.89C118.529 30.81 118.493 30.6967 118.493 30.55V24.4C118.493 24.2533 118.529 24.1433 118.603 24.07C118.683 23.99 118.796 23.95 118.943 23.95H120.873C122.013 23.95 122.893 24.25 123.513 24.85C124.133 25.45 124.443 26.3233 124.443 27.47C124.443 28.0433 124.363 28.55 124.203 28.99C124.049 29.4233 123.819 29.79 123.513 30.09C123.206 30.39 122.833 30.6167 122.393 30.77C121.953 30.9233 121.446 31 120.873 31H118.943ZM119.313 30.3H120.813C121.279 30.3 121.683 30.24 122.023 30.12C122.369 30 122.656 29.8233 122.883 29.59C123.116 29.3567 123.289 29.0633 123.403 28.71C123.516 28.35 123.573 27.9367 123.573 27.47C123.573 26.53 123.343 25.8267 122.883 25.36C122.423 24.8867 121.733 24.65 120.813 24.65H119.313V30.3Z" fill="currentColor" />
                <path d="M128.024 31.07C127.891 31.07 127.788 31.0333 127.714 30.96C127.648 30.88 127.614 30.7733 127.614 30.64V24.37C127.614 24.23 127.651 24.1267 127.724 24.06C127.798 23.9867 127.901 23.95 128.034 23.95H130.404C131.158 23.95 131.738 24.1267 132.145 24.48C132.551 24.8333 132.755 25.3367 132.755 25.99C132.755 26.4033 132.661 26.7633 132.475 27.07C132.295 27.37 132.028 27.6 131.674 27.76C131.321 27.9133 130.898 27.99 130.404 27.99L130.505 27.86H130.704C130.964 27.86 131.191 27.9267 131.384 28.06C131.578 28.1933 131.754 28.4067 131.914 28.7L132.874 30.49C132.928 30.5833 132.951 30.6767 132.944 30.77C132.944 30.8567 132.914 30.93 132.854 30.99C132.794 31.0433 132.708 31.07 132.594 31.07C132.481 31.07 132.388 31.0433 132.314 30.99C132.241 30.9367 132.178 30.86 132.124 30.76L131.035 28.74C130.881 28.4533 130.705 28.2633 130.505 28.17C130.305 28.07 130.041 28.02 129.714 28.02H128.434V30.64C128.434 30.7733 128.401 30.88 128.334 30.96C128.268 31.0333 128.164 31.07 128.024 31.07ZM128.434 27.37H130.285C130.831 27.37 131.244 27.2567 131.524 27.03C131.804 26.7967 131.944 26.45 131.944 25.99C131.944 25.5433 131.804 25.2067 131.524 24.98C131.244 24.7467 130.831 24.63 130.285 24.63H128.434V27.37Z" fill="currentColor" />
                <path d="M61.551 41.088C61.3236 41.088 61.1476 41.0257 61.023 40.901C60.9056 40.769 60.847 40.5893 60.847 40.362V33.96C60.847 33.7253 60.9093 33.5493 61.034 33.432C61.1586 33.3073 61.3346 33.245 61.562 33.245H64.213C65.0636 33.245 65.72 33.4577 66.182 33.883C66.644 34.3083 66.875 34.9023 66.875 35.665C66.875 36.4277 66.644 37.0253 66.182 37.458C65.72 37.8833 65.0636 38.096 64.213 38.096H62.255V40.362C62.255 40.5893 62.1963 40.769 62.079 40.901C61.9616 41.0257 61.7856 41.088 61.551 41.088ZM62.255 36.985H63.993C64.4916 36.985 64.8693 36.875 65.126 36.655C65.3826 36.4277 65.511 36.0977 65.511 35.665C65.511 35.2323 65.3826 34.906 65.126 34.686C64.8693 34.466 64.4916 34.356 63.993 34.356H62.255V36.985Z" fill="currentColor" />
                <path d="M70.8267 41.088C70.5994 41.088 70.4234 41.0257 70.2987 40.901C70.1814 40.769 70.1227 40.5893 70.1227 40.362V33.96C70.1227 33.7253 70.1851 33.5493 70.3097 33.432C70.4344 33.3073 70.6104 33.245 70.8377 33.245H73.4887C74.3394 33.245 74.9957 33.4503 75.4577 33.861C75.9197 34.2643 76.1507 34.8327 76.1507 35.566C76.1507 36.0427 76.0444 36.4533 75.8317 36.798C75.6264 37.1427 75.3257 37.4067 74.9297 37.59C74.5337 37.7733 74.0534 37.865 73.4887 37.865L73.5877 37.7H73.9507C74.2514 37.7 74.5118 37.7733 74.7318 37.92C74.9591 38.0667 75.1571 38.2977 75.3257 38.613L76.1507 40.142C76.2387 40.296 76.2791 40.4463 76.2718 40.593C76.2644 40.7397 76.2094 40.8607 76.1068 40.956C76.0041 41.044 75.8537 41.088 75.6557 41.088C75.4577 41.088 75.2964 41.0477 75.1717 40.967C75.0471 40.879 74.9371 40.747 74.8418 40.571L73.7308 38.525C73.5988 38.2757 73.4411 38.1107 73.2577 38.03C73.0817 37.942 72.8544 37.898 72.5757 37.898H71.5307V40.362C71.5307 40.5893 71.4721 40.769 71.3547 40.901C71.2374 41.0257 71.0614 41.088 70.8267 41.088ZM71.5307 36.853H73.2467C73.7527 36.853 74.1341 36.7503 74.3907 36.545C74.6547 36.3323 74.7868 36.017 74.7868 35.599C74.7868 35.1883 74.6547 34.8803 74.3907 34.675C74.1341 34.4623 73.7527 34.356 73.2467 34.356H71.5307V36.853Z" fill="currentColor" />
                <path d="M82.2298 41.088C82.0025 41.088 81.8265 41.0257 81.7018 40.901C81.5845 40.769 81.5258 40.5857 81.5258 40.351V37.007L81.8228 37.854L79.1718 34.125C79.0765 33.993 79.0325 33.8537 79.0398 33.707C79.0545 33.553 79.1168 33.4247 79.2268 33.322C79.3368 33.212 79.4908 33.157 79.6888 33.157C79.8355 33.157 79.9675 33.1937 80.0848 33.267C80.2095 33.3403 80.3268 33.454 80.4368 33.608L82.4058 36.402H82.0978L84.0778 33.608C84.1952 33.4467 84.3088 33.333 84.4188 33.267C84.5288 33.1937 84.6645 33.157 84.8258 33.157C85.0165 33.157 85.1632 33.2083 85.2658 33.311C85.3758 33.4063 85.4308 33.5273 85.4308 33.674C85.4382 33.8207 85.3868 33.9747 85.2768 34.136L82.6478 37.854L82.9338 37.007V40.351C82.9338 40.8423 82.6992 41.088 82.2298 41.088Z" fill="currentColor" />
                <path d="M91.7113 41.088C91.5133 41.088 91.3483 41.044 91.2163 40.956C91.0917 40.8607 90.989 40.7213 90.9083 40.538L88.0373 34.092C87.9567 33.9087 87.9347 33.7473 87.9713 33.608C88.008 33.4687 88.085 33.3587 88.2023 33.278C88.3197 33.1973 88.459 33.157 88.6203 33.157C88.833 33.157 88.9907 33.2047 89.0933 33.3C89.2033 33.388 89.295 33.5237 89.3683 33.707L91.9753 39.746H91.5023L94.0983 33.696C94.179 33.52 94.2743 33.388 94.3843 33.3C94.4943 33.2047 94.6483 33.157 94.8463 33.157C95.0077 33.157 95.1397 33.1973 95.2423 33.278C95.3523 33.3587 95.422 33.4687 95.4513 33.608C95.4807 33.7473 95.455 33.9087 95.3743 34.092L92.5033 40.538C92.4227 40.7213 92.32 40.8607 92.1953 40.956C92.078 41.044 91.9167 41.088 91.7113 41.088Z" fill="currentColor" />
                <path d="M97.9949 41.088C97.8189 41.088 97.6759 41.0477 97.5659 40.967C97.4632 40.8863 97.4009 40.78 97.3789 40.648C97.3569 40.5087 97.3825 40.3547 97.4559 40.186L100.36 33.751C100.455 33.5383 100.569 33.388 100.701 33.3C100.84 33.2047 100.998 33.157 101.174 33.157C101.343 33.157 101.493 33.2047 101.625 33.3C101.764 33.388 101.882 33.5383 101.977 33.751L104.892 40.186C104.973 40.3547 105.002 40.5087 104.98 40.648C104.958 40.7873 104.896 40.8973 104.793 40.978C104.69 41.0513 104.555 41.088 104.386 41.088C104.181 41.088 104.019 41.0403 103.902 40.945C103.792 40.8423 103.693 40.6883 103.605 40.483L102.89 38.822L103.484 39.207H98.8419L99.4359 38.822L98.7319 40.483C98.6365 40.6957 98.5375 40.8497 98.4349 40.945C98.3322 41.0403 98.1855 41.088 97.9949 41.088ZM101.152 34.774L99.6119 38.437L99.3259 38.085H103L102.725 38.437L101.174 34.774H101.152Z" fill="currentColor" />
                <path d="M108.918 41C108.691 41 108.515 40.9377 108.39 40.813C108.266 40.681 108.203 40.5013 108.203 40.274V33.927C108.203 33.6923 108.262 33.5163 108.379 33.399C108.504 33.2743 108.68 33.212 108.907 33.212C109.135 33.212 109.307 33.2743 109.424 33.399C109.549 33.5163 109.611 33.6923 109.611 33.927V39.801H112.801C112.999 39.801 113.15 39.8523 113.252 39.955C113.362 40.0577 113.417 40.2043 113.417 40.395C113.417 40.5857 113.362 40.736 113.252 40.846C113.15 40.9487 112.999 41 112.801 41H108.918Z" fill="currentColor" />
                <path d="M119.537 41.11C118.789 41.11 118.133 40.945 117.568 40.615C117.011 40.285 116.578 39.823 116.27 39.229C115.962 38.6277 115.808 37.9237 115.808 37.117C115.808 36.5083 115.896 35.962 116.072 35.478C116.248 34.9867 116.498 34.5687 116.82 34.224C117.15 33.872 117.543 33.6043 117.997 33.421C118.459 33.2303 118.973 33.135 119.537 33.135C120.293 33.135 120.949 33.3 121.506 33.63C122.064 33.9527 122.496 34.411 122.804 35.005C123.112 35.599 123.266 36.2993 123.266 37.106C123.266 37.7147 123.178 38.2647 123.002 38.756C122.826 39.2473 122.573 39.669 122.243 40.021C121.921 40.373 121.528 40.6443 121.066 40.835C120.612 41.0183 120.102 41.11 119.537 41.11ZM119.537 39.9C120.014 39.9 120.417 39.79 120.747 39.57C121.085 39.35 121.341 39.031 121.517 38.613C121.701 38.195 121.792 37.6963 121.792 37.117C121.792 36.237 121.594 35.555 121.198 35.071C120.81 34.587 120.256 34.345 119.537 34.345C119.068 34.345 118.665 34.455 118.327 34.675C117.99 34.8877 117.73 35.203 117.546 35.621C117.37 36.0317 117.282 36.5303 117.282 37.117C117.282 37.9897 117.48 38.6717 117.876 39.163C118.272 39.6543 118.826 39.9 119.537 39.9Z" fill="currentColor" />
                <path d="M129.685 41.088C129.487 41.088 129.322 41.044 129.19 40.956C129.065 40.8607 128.962 40.7213 128.882 40.538L126.011 34.092C125.93 33.9087 125.908 33.7473 125.945 33.608C125.981 33.4687 126.058 33.3587 126.176 33.278C126.293 33.1973 126.432 33.157 126.594 33.157C126.806 33.157 126.964 33.2047 127.067 33.3C127.177 33.388 127.268 33.5237 127.342 33.707L129.949 39.746H129.476L132.072 33.696C132.152 33.52 132.248 33.388 132.358 33.3C132.468 33.2047 132.622 33.157 132.82 33.157C132.981 33.157 133.113 33.1973 133.216 33.278C133.326 33.3587 133.395 33.4687 133.425 33.608C133.454 33.7473 133.428 33.9087 133.348 34.092L130.477 40.538C130.396 40.7213 130.293 40.8607 130.169 40.956C130.051 41.044 129.89 41.088 129.685 41.088Z" fill="currentColor" />
              </svg>
            </Link>
          )}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden dark:text-gray-200"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {showMenu && <Menu className="h-8 w-8 stroke-1" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-64' : 'max-h-0'
          }`}
        onClick={handleDrawerClick}
      >
        <div className="p-5 pt-0">
          {showNav && (
            <nav className="space-y-6 mt-8">
              <div className="text-sm space-y-4 flex flex-col font-bold">
                <div className="relative">
                  <Link
                    href="/about"
                    className="font-nunito inline-block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {translations.about}
                  </Link>
                </div>
                <div className="relative">
                  <Link
                    href="/exhibitions"
                    className="font-nunito inline-block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {translations.exhibitions}
                  </Link>
                </div>
                <div className="relative">
                  <Link
                    href="/contact"
                    className="font-nunito inline-block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    contact
                  </Link>
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <Link
                    href="https://www.instagram.com/oleksandr.pryvalov.art/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Profile - Oleksandr Pryvalov"
                    className="flex items-center justify-center rounded-full w-5 h-5 focus:outline-none focus:ring-2 focus:ring-darkGold"
                  >
                    <FaInstagram className="text-base" aria-hidden="true" />
                  </Link>

                  <button
                    onClick={toggleLanguage}
                    className="rounded-full w-5 h-5 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-darkGold text-xs font-medium"
                    aria-label={translations.switch_language}
                  >
                    {language}
                  </button>

                  <button
                    onClick={toggleTheme}
                    className="rounded-full w-5 h-5 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-darkGold"
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'
                      } mode`}
                  >
                    {theme === 'light' ? (
                      <Moon className="w-4 h-4" />
                    ) : (
                      <Sun className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
