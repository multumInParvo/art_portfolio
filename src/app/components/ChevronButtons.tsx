// components/ChevronButtons.tsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ChevronButtonsProps {
  onPrev: () => void;
  onNext: () => void;
}

export default function ChevronButtons({ onPrev, onNext }: ChevronButtonsProps) {
  return (
    <div className="flex justify-between w-full max-w-xl md:flex items-center">
      <button onClick={onPrev} className="absolute left-0 z-10">
        <ChevronLeft className='h-10 w-10 md:h-12 md:w-12 stroke-1' />
      </button>
      <button onClick={onNext} className="absolute right-0 z-10">
        <ChevronRight className='h-10 w-10 md:h-12 md:w-12 stroke-1' />
      </button>
    </div>
  );
}