import { createContext, useState, type PropsWithChildren } from "react";
import type { Lobe, LobeId, ThyroidalLobes } from "@/types/lobe/lobe.type";

interface LobeContext {
  thyroidalLobes: ThyroidalLobes;
  updateLobe: <K extends keyof Lobe>(
    id: LobeId,
    field: K,
    value: Lobe[K]
  ) => void;
  updateGlobalField: <K extends keyof ThyroidalLobes>(
    field: K,
    value: ThyroidalLobes[K]
  ) => void;
}

export const LobeContext = createContext({} as LobeContext);

const getDefaultLobe = (id: LobeId): Lobe => ({
  id,
  ap: "20",
  cc: "20",
  t: "20",
  isAbsent: false,
  isDefault: true,
});

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
    id: LobeId,
    field: K,
    value: Lobe[K]
  ) => {
    setThyroidalLobes((prev) => {
      const updatedLobes = prev.lobes.map((lobe) => {
        if (lobe.id !== id) return lobe;

        const updatedLobe = { ...lobe, [field]: value };

        // Logic: If isDefault becomes true, set dimensions to 20
        if (field === "isDefault" && value === true) {
          updatedLobe.ap = "20";
          updatedLobe.cc = "20";
          updatedLobe.t = "20";
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
