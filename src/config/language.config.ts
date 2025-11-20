import ES from "country-flag-icons/react/3x2/ES";
import GB from "country-flag-icons/react/3x2/GB";
import type { Language, LanguageConfig } from "@/types/language/language.type";

/*
 * Configuración centralizada de idiomas soportados
 * Para añadir un nuevo idioma:
 * 1. Importar el componente de bandera correspondiente
 * 2. Añadir la entrada en LANGUAGE_CONFIG
 * 3. Crear el archivo de traducciones en src/i18n/{code}/
 */
export const LANGUAGE_CONFIG: Record<Language, Omit<LanguageConfig, "code">> = {
  es: {
    name: "Español",
    Flag: ES,
  },
  en: {
    name: "English",
    Flag: GB,
  },
};

/*
 * Genera automáticamente las opciones de idioma desde LANGUAGE_CONFIG
 */
export const LANGUAGE_OPTIONS: LanguageConfig[] = Object.entries(
  LANGUAGE_CONFIG
).map(([code, config]) => ({
  code: code as Language,
  ...config,
}));
