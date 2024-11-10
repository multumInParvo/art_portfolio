// pages/image-viewer/page.tsx
"use client";

import React, { Suspense } from 'react';
import ImageViewerClient from '../components/ImageViewerClient';

export default function ImageViewerPage() {
  return (
    <Suspense>
      <ImageViewerClient />
    </Suspense>
  );
}
