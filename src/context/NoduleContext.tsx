import type { Lobe, Nodule } from "@/types/nodule/nodule.type";
import { createContext, useState, type PropsWithChildren } from "react";
import type { Dimension } from "./DimensionsContext";

interface NoduleContext {
  nodules: Nodule[];
  updateLobe: (id: number, newLobe: Lobe) => void;
  updateDimension: (
    id: number,
    dimensionName: Dimension,
    newDimension: string
  ) => void;
}

export const NoduleContext = createContext({} as NoduleContext);

export const NoduleProvider = ({ children }: PropsWithChildren) => {
  const [nodules, setNodules] = useState<Nodule[]>([
    {
      id: 1,
      lobe: "right",
      location: "superior",
      ap: "",
      cc: "",
      t: "",
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

  const updateDimension = (
    id: number,
    dimensionName: Dimension,
    newDimension: string
  ) => {
    const { id: dimensionID } = dimensionName;

    console.log(id, dimensionID, newDimension);

    setNodules((prev) =>
      prev.map((nodule) =>
        nodule.id === id ? { ...nodule, [dimensionID]: newDimension } : nodule
      )
    );
  };

  return (
    <NoduleContext value={{ nodules, updateLobe, updateDimension }}>
      {children}
    </NoduleContext>
  );
};
