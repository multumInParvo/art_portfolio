'use client';

import React, { createContext, useState, useContext } from 'react';

type Painting = {
  src: string;
  title: string;
  description: string;
  dimensions: string;
  year: number;
};

type PaintingContextType = {
  currentPainting: Painting | null;
  setCurrentPainting: React.Dispatch<React.SetStateAction<Painting | null>>;
  goToPrevious: () => void;
  goToNext: () => void;
  setGoToPrevious: React.Dispatch<React.SetStateAction<() => void>>;
  setGoToNext: React.Dispatch<React.SetStateAction<() => void>>;
};

const PaintingContext = createContext<PaintingContextType | undefined>(undefined);

export const PaintingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPainting, setCurrentPainting] = useState<Painting | null>(null);
  const [goToPrevious, setGoToPrevious] = useState<() => void>(() => {});
  const [goToNext, setGoToNext] = useState<() => void>(() => {});

  return (
    <PaintingContext.Provider value={{ currentPainting, setCurrentPainting, goToPrevious, goToNext, setGoToPrevious, setGoToNext }}>
      {children}
    </PaintingContext.Provider>
  );
};

export const usePainting = () => {
  const context = useContext(PaintingContext);
  if (context === undefined) {
    throw new Error('usePainting must be used within a PaintingProvider');
  }
  return context;
};
