// app/components/LayoutWrapper.tsx
'use client';

import { LanguageProvider } from '../context/LanguageContext';
import ClientLayout from './ClientLayout';

export default function LayoutWrapper({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) {
  return (
    <LanguageProvider>
      <ClientLayout isLoading={isLoading}>{children}</ClientLayout>
    </LanguageProvider>
  );
}