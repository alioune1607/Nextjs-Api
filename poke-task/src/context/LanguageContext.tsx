'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { dictionaries } from '../utils/dictionaries';

type Lang = 'sp' | 'en' | 'fr';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  dictionary: typeof dictionaries['sp'];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('sp');

  return (
    <LanguageContext.Provider value={{ lang, setLang, dictionary: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};