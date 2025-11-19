import type { Lobe, Nodule } from "@/types/nodule/nodule.type";
import { createContext, useState, type PropsWithChildren } from "react";

interface NoduleContext {
  nodules: Nodule[];
  updateLobe: (id: number, newLobe: Lobe) => void;
}

export const NoduleContext = createContext({} as NoduleContext);

export const NoduleProvider = ({ children }: PropsWithChildren) => {
  const [nodules, setNodules] = useState<Nodule[]>([
    {
      id: 1,
      lobe: "right",
      location: "superior",
      ap: 0,
      cc: 0,
      t: 0,
      composition: "cannotBeAssessed",
      echogenicity: "cannotBeAssessed",
      margin: "cannotBeAssessed",
      isExtrathyroidalExtension: false,
      extrathyroidalExtensionLocation: "anterior",
      isCalcification: false,
      calcificationType: "microcalcifications",
      vascularity: "notEvaluated",
      vascularityType: "low",
      isTallerThanWide: "no",
      isTallerThanLong: "no",
      categories: [],
      observations: "",
    },
  ]);

  const updateLobe = (id: number, newLobe: Lobe) => {
    setNodules((prev) =>
      prev.map((nodule) =>
        nodule.id === id ? { ...nodule, lobe: newLobe } : nodule
      )
    );
  };

  return (
    <NoduleContext value={{ nodules, updateLobe }}>{children}</NoduleContext>
  );
};
