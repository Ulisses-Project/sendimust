import { createContext, useState, type PropsWithChildren } from "react";
import type { Lobe, Location, ThyroidalLobes } from "@/types/lobe/lobe.type";

interface LobeContext {
  thyroidalLobes: ThyroidalLobes;
  updateLobe: <K extends keyof Lobe>(
    location: Location,
    field: K,
    value: Lobe[K]
  ) => void;
  updateGlobalField: <K extends keyof ThyroidalLobes>(
    field: K,
    value: ThyroidalLobes[K]
  ) => void;
}

export const LobeContext = createContext({} as LobeContext);

const getDefaultLobe = (location: Location): Lobe => {
  const isIsthmus = location === "isthmus";
  return {
    location,
    ap: isIsthmus ? "2" : "20",
    t: isIsthmus ? undefined : "20",
    cc: isIsthmus ? undefined : "40",
    isAbsent: false,
    isDefault: true,
  };
};

const initialThyroidalLobes: ThyroidalLobes = {
  lobes: [
    getDefaultLobe("right"),
    getDefaultLobe("left"),
    getDefaultLobe("isthmus"),
  ],
  globalEchogenicity: "homogeneous",
  globalVascularity: "notEvaluated",
  observations: "",
};

export const LobeProvider = ({ children }: PropsWithChildren) => {
  const [thyroidalLobes, setThyroidalLobes] = useState<ThyroidalLobes>(
    initialThyroidalLobes
  );

  const updateLobe = <K extends keyof Lobe>(
    location: Location,
    field: K,
    value: Lobe[K]
  ) => {
    setThyroidalLobes((prev) => {
      const updatedLobes = prev.lobes.map((lobe) => {
        if (lobe.location !== location) return lobe;

        const updatedLobe = { ...lobe, [field]: value };
        //* Actualizando los valores por defecto
        if (field === "isDefault" && value === true) {
          const isIsthmus = location === "isthmus";
          updatedLobe.ap = isIsthmus ? "2" : "20";
          updatedLobe.t = isIsthmus ? undefined : "20";
          updatedLobe.cc = isIsthmus ? undefined : "40";
        }

        return updatedLobe;
      });

      return { ...prev, lobes: updatedLobes };
    });
  };

  const updateGlobalField = <K extends keyof ThyroidalLobes>(
    field: K,
    value: ThyroidalLobes[K]
  ) => {
    setThyroidalLobes((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <LobeContext.Provider
      value={{ thyroidalLobes, updateLobe, updateGlobalField }}
    >
      {children}
    </LobeContext.Provider>
  );
};
