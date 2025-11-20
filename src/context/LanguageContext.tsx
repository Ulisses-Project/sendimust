import { translations } from "@/i18n";
import { createContext, useState, useEffect, type ReactNode } from "react";
import type { Language, LanguageConfig } from "@/types/language/language.type";
import { LANGUAGE_OPTIONS } from "@/config/language.config";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getDict: (key: string) => Record<string, string>;
  languageConfig: LanguageConfig;
  languageOptions: LanguageConfig[];
}

export const LanguageContext = createContext<LanguageContextType>(
  {} as LanguageContextType
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language | null;
    if (saved && LANGUAGE_OPTIONS.some((opt) => opt.code === saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const languageConfig =
    LANGUAGE_OPTIONS.find((opt) => opt.code === language) ||
    LANGUAGE_OPTIONS[0];

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = (translations as any)[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key; //* retorno fallback
      }
    }
    return typeof value === "string" ? value : key;
  };

  //* Nueva función para obtener diccionarios completos de traducción
  const getDict = (key: string): Record<string, string> => {
    const keys = key.split(".");
    let value: any = (translations as any)[language];
    let currentPath = language;

    for (const k of keys) {
      currentPath += `.${k}`;
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        console.warn(
          `[LanguageContext] Translation key not found: "${currentPath}" for language "${language}"`
        );
        return {};
      }
    }

    //* Validar que el valor final sea un objeto con traducciones
    if (!value || typeof value !== "object") {
      console.warn(
        `[LanguageContext] Expected object at "${key}" but got ${typeof value} for language "${language}"`
      );
      return {};
    }

    //* Validar que el objeto contenga al menos una traducción válida
    const dict: Record<string, string> = {};
    let hasValidTranslations = false;

    for (const k in value) {
      if (typeof value[k] === "string") {
        dict[k] = value[k];
        hasValidTranslations = true;
      } else {
        console.warn(
          `[LanguageContext] Skipping non-string value at "${key}.${k}" for language "${language}"`
        );
      }
    }

    if (!hasValidTranslations) {
      console.warn(
        `[LanguageContext] No valid string translations found at "${key}" for language "${language}"`
      );
    }

    return dict;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        getDict,
        languageConfig,
        languageOptions: LANGUAGE_OPTIONS,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
