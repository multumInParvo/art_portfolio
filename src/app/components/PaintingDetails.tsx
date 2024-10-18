'use client';

import React from 'react';
import { usePainting } from '../context/PaintingContext';

const PaintingDetails = React.memo(function PaintingDetails() {
  const { currentPainting, goToPrevious, goToNext } = usePainting();

  if (!currentPainting) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-1 font-proxima text-gray-600">
        {currentPainting.title}
      </h2>
      <p className="text-sm font-proxima">{currentPainting.dimensions}</p>
      <p className="text-sm font-proxima">{currentPainting.year}</p>
      <div className="mt-2 text-sm">
        <button
          onClick={goToPrevious}
          className="hover:underline font-proxima font-semibold text-gray-600"
        >
          PREV
        </button>
        <span className="mx-1 font-proxima font-semibold">/</span>
        <button
          onClick={goToNext}
          className="hover:underline font-proxima font-semibold text-gray-600"
        >
          NEXT
        </button>
      </div>
    </div>
  );
});

export default PaintingDetails;
