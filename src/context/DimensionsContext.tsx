"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type DimensionField = "ap" | "t" | "cc";

export interface Dimension {
  id: DimensionField;
  label: string;
}

interface DimensionsContextType {
  dimensions: Dimension[];
  setDimensions: React.Dispatch<React.SetStateAction<Dimension[]>>;
}

const DimensionsContext = createContext<DimensionsContextType | undefined>(
  undefined
);

const STORAGE_KEY = "thyroid-dimensions-order";

const initialDimensions: Dimension[] = [
  { id: "ap", label: "AP [mm]" },
  { id: "t", label: "T [mm]" },
  { id: "cc", label: "CC [mm]" },
];

export const DimensionsProvider = ({ children }: { children: ReactNode }) => {
  const [dimensions, setDimensions] = useState<Dimension[]>(() => {
    // Inicializar desde localStorage si está disponible
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (error) {
        console.error("Error reading from localStorage:", error);
      }
    }
    return initialDimensions;
  });

  // Sincronizar con localStorage cada vez que cambie el orden
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dimensions));
      } catch (error) {
        console.error("Error writing to localStorage:", error);
      }
    }
  }, [dimensions]);

  return (
    <DimensionsContext.Provider value={{ dimensions, setDimensions }}>
      {children}
    </DimensionsContext.Provider>
  );
};

export const useDimensions = () => {
  const context = useContext(DimensionsContext);
  if (!context) {
    throw new Error("useDimensions must be used within DimensionsProvider");
  }
  return context;
};
