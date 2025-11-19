import type {
  isCalcification,
  isExtrathyroidalExtension,
  Lobe,
  Nodule,
} from "@/types/nodule/nodule.type";
import { createContext, useState, type PropsWithChildren } from "react";
import type { Dimension } from "./DimensionsContext";

interface NoduleContext {
  currentNoduleId: number;
  nodules: Nodule[];
  updateLobe: (id: number, newLobe: Lobe) => void;
  updateDimension: (
    id: number,
    dimensionName: Dimension,
    newDimension: string
  ) => void;
  setExtrathyroidalExtension: (
    id: number,
    newExtrathyroidalExtension: isExtrathyroidalExtension
  ) => void;
  setCalcification: (id: number, newCalcification: isCalcification) => void;
  setCurrentNoduleId: (id: number) => void;
  addNodule: () => void;
}

export const NoduleContext = createContext({} as NoduleContext);

const getDefaultNodule = (id: number): Nodule => {
  return {
    id: id,
    lobe: "right",
    location: ["superior"],
    ap: "",
    cc: "",
    t: "",
    composition: "cannotBeAssessed",
    echogenicity: "cannotBeAssessed",
    margin: "cannotBeAssessed",
    isExtrathyroidalExtension: "no",
    extrathyroidalExtensionLocation: "anterior",
    isCalcification: "no",
    calcificationType: "microcalcifications",
    vascularity: "notEvaluated",
    vascularityType: "low",
    isTallerThanWide: "no",
    isTallerThanLong: "no",
    categories: [],
    observations: "",
  };
};

export const NoduleProvider = ({ children }: PropsWithChildren) => {
  const [currentNoduleId, setCurrentNoduleId] = useState(1);

  const [nodules, setNodules] = useState<Nodule[]>([
    getDefaultNodule(1),
    getDefaultNodule(2),
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

  //! Cambiar esto
  const setExtrathyroidalExtension = (
    id: number,
    newExtrathyroidalExtension: isExtrathyroidalExtension
  ) => {
    setNodules((prev) =>
      prev.map((nodule) =>
        nodule.id === id
          ? { ...nodule, isExtrathyroidalExtension: newExtrathyroidalExtension }
          : nodule
      )
    );
  };

  //! Cambiar esto
  const setCalcification = (id: number, newCalcification: isCalcification) => {
    setNodules((prev) =>
      prev.map((nodule) =>
        nodule.id === id
          ? { ...nodule, isCalcification: newCalcification }
          : nodule
      )
    );
  };

  const getGreatestId = (nodules: Nodule[]) => {
    const ids = nodules.map((nodule) => nodule.id);
    return Math.max(...ids);
  };

  const addNodule = () => {
    const newNodule = getDefaultNodule(getGreatestId(nodules) + 1);
    setCurrentNoduleId(newNodule.id);
    setNodules((prev) => [...prev, newNodule]);
  };

  return (
    <NoduleContext
      value={{
        currentNoduleId,
        nodules,
        updateLobe,
        updateDimension,
        setExtrathyroidalExtension,
        setCalcification,
        setCurrentNoduleId,
        addNodule,
      }}
    >
      {children}
    </NoduleContext>
  );
};
