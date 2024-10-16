'use client';

import { usePainting } from '../context/PaintingContext';

export default function PaintingDetails() {
  const { currentPainting, goToPrevious, goToNext } = usePainting();

  if (!currentPainting) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-1 font-nunito">
        {currentPainting.title}
      </h2>
      <p className="text-sm font-nunito">{currentPainting.dimensions}</p>
      <p className="text-sm font-nunito">{currentPainting.year}</p>
      <div className="mt-2 text-sm">
        <button
          onClick={goToPrevious}
          className="hover:underline font-nunito font-bold"
        >
          PREV
        </button>
        <span className="mx-1 font-nunito font-bold">/</span>
        <button
          onClick={goToNext}
          className="hover:underline font-nunito font-bold"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
