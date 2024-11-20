'use client';

import React, { createContext, useContext, useState, } from 'react';

type Language = 'EN' | 'FR';

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('EN');
  const [isFading, setIsFading] = useState(false);

  const toggleLanguage = () => {
    setIsFading(true); // Trigger fade-out
    setTimeout(() => {
      setLanguage((prev) => (prev === 'EN' ? 'FR' : 'EN')); // Change language after fade-out
      setIsFading(false); // Trigger fade-in
    }, 300); // Match fade-out duration
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      <div
        className={`transition-opacity duration-200 ${
          isFading ? 'opacity-50' : 'opacity-100'
        }`}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
