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
        <ChevronLeft size={48} strokeWidth={1} />
      </button>
      <button onClick={onNext} className="absolute right-0 z-10">
        <ChevronRight size={48} strokeWidth={1} />
      </button>
    </div>
  );
}