// components/ScrollArrows.tsx
'use client';

import { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function ScrollArrows() {
    const [showArrows, setShowArrows] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const halfwayPoint = window.innerHeight / 2;
            setShowArrows(window.scrollY > halfwayPoint);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const scrollToBottom = () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

    return showArrows ? (
        <div className="fixed right-5 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-50">
            <button
                onClick={scrollToTop}
                aria-label="Scroll to Top"
                className="bg-gray-500 bg-opacity-50 hover:bg-opacity-80 rounded-full p-2"
            >
                <FaArrowUp className="text-white" />
            </button>
            <button
                onClick={scrollToBottom}
                aria-label="Scroll to Bottom"
                className="bg-gray-500 bg-opacity-50 hover:bg-opacity-80 rounded-full p-2"
            >
                <FaArrowDown className="text-white" />
            </button>
        </div>

    ) : null;
}
