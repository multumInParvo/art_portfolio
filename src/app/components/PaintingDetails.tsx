'use client';

import { usePainting } from '../context/PaintingContext';

export default function PaintingDetails() {
  const { currentPainting } = usePainting();

  if (!currentPainting) return null;

  return (
    <div className="mt-8 bg-white bg-opacity-75 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold">{currentPainting.title}</h2>
      <p>{currentPainting.description}</p>
      <p>{currentPainting.dimensions}</p>
      <p>{currentPainting.year}</p>
    </div>
  );
}