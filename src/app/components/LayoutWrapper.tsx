// app/components/LayoutWrapper.tsx
'use client';

import { LanguageProvider } from '../context/LanguageContext';
import ClientLayout from './ClientLayout';

export default function LayoutWrapper({
  children,
 
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) {
  return (
    <LanguageProvider>
      <ClientLayout>{children}</ClientLayout>
    </LanguageProvider>
  );
}