import en from "@/i18n/en";
import nodule from "./es/nodule";
import { lobe } from "./es/lobe";

export const translations = {
  es: {
    nodule,
    lobe,
  },
  en,
};
export type Language = keyof typeof translations;
