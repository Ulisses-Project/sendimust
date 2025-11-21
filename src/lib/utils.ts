import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function optionsMapper(dict: Record<string, string>) {
  return Object.entries(dict).map(([value, label]) => ({
    value,
    label,
  }));
}
