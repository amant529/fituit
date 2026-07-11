"use client";

import React, { createContext, useContext } from 'react';

// Using any here to bypass complex dictionary typing for now
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LanguageContext = createContext<any>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function LanguageProvider({ children, dictionary }: { children: React.ReactNode, dictionary: any }) {
  return (
    <LanguageContext.Provider value={dictionary}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useDictionary() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useDictionary must be used within a LanguageProvider');
  }
  return context;
}
