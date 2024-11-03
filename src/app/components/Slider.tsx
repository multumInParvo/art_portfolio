'use client';

import React, { Suspense } from 'react';
import { SliderContent } from './SliderContent';
import type { Painting } from '../data/paintings'; 

type SliderProps = {
  paintings: Painting[];
};

export default function Slider(props: SliderProps) {
  return (
    <Suspense 
      fallback={
        <div className="relative h-[calc(100vh-5rem)] w-full bg-gray-100 animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-gray-300 rounded-full animate-spin"></div>
          </div>
        </div>
      }
    >
      <SliderContent paintings={props.paintings} />
    </Suspense>
  );
}