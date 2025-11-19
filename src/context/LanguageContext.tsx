import { translations } from "@/i18n";
import { createContext, useState, useEffect, type ReactNode } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getDict: (key: string) => Record<string, string>; // nueva función para obtener diccionarios
}

export const LanguageContext = createContext<LanguageContextType>(
  {} as LanguageContextType
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language | null;
    if (saved && (saved === "es" || saved === "en")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key; // retorno fallback
      }
    }
    return typeof value === "string" ? value : key;
  };

  // Nueva función para obtener diccionarios completos de traducción
  const getDict = (key: string): Record<string, string> => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      }
    }

    //! Añadir un error si no se encuentra el diccionario
    if (typeof value !== "object") {
      return {};
    }

    // Aseguramos que todos los valores sean strings para el select
    const dict: Record<string, string> = {};
    for (const k in value) {
      if (typeof value[k] === "string") {
        dict[k] = value[k];
      }
    }
    return dict;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getDict }}>
      {children}
    </LanguageContext.Provider>
  );
}
