'use client';

import React from 'react';
import { usePainting } from '../context/PaintingContext';

const PaintingDetails = React.memo(function PaintingDetails() {
  const { currentPainting, goToPrevious, goToNext } = usePainting();

  if (!currentPainting) return null;

  return (
    <div className="hidden md:block">
      <h2 className="text-lg font-bold mb-1 font-nunito text-gray-600">
        {currentPainting.title}
      </h2>
        <p className="text-sm font-nunito">{currentPainting.dimensions}</p>
        <p className="text-sm font-nunito">{currentPainting.year}</p>
      <div className="mt-2 text-sm hidden md:block">
        <button
          onClick={goToPrevious}
          className="hover:underline font-nunito font-bold text-gray-600"
        >
          PREV
        </button>
        <span className="mx-1 font-nunito font-bold">/</span>
        <button
          onClick={goToNext}
          className="hover:underline font-nunito font-bold text-gray-600"
        >
          NEXT
        </button>
      </div>
    </div>
  );
});

export default PaintingDetails;