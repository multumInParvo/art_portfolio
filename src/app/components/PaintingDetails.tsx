'use client';

import { usePainting } from '../context/PaintingContext';

export default function PaintingDetails() {
  const { currentPainting, goToPrevious, goToNext } = usePainting();

  if (!currentPainting) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold">{currentPainting.title}</h2>
      <p>{currentPainting.description}</p>
      <p>{currentPainting.dimensions}</p>
      <p>{currentPainting.year}</p>
      <div className="mt-4 text-sm">
        <button onClick={goToPrevious} className="hover:underline">prev</button>
        <span className="mx-2">/</span>
        <button onClick={goToNext} className="hover:underline">next</button>
      </div>
    </div>
  );
}