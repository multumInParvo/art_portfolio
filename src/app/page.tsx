'use client';

import { paintings } from '../app/data/paintings';
import Slider from '../app/components/Slider';
import ThumbnailsPage from './thumbnails/page';

export default function Home() {
  return (
    <div className="h-full">
      <div className="block md:hidden">
        <ThumbnailsPage />
      </div>
      <div className="hidden md:block">
        <Slider paintings={paintings} />
      </div>
    </div>
  );
}