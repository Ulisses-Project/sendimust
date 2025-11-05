"use client";

import React, {
  createContext,
  useContext,
  useState,
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

const initialDimensions: Dimension[] = [
  { id: "ap", label: "AP [mm]" },
  { id: "t", label: "T [mm]" },
  { id: "cc", label: "CC [mm]" },
];

export const DimensionsProvider = ({ children }: { children: ReactNode }) => {
  const [dimensions, setDimensions] = useState<Dimension[]>(initialDimensions);

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
