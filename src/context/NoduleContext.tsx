import type { Nodule } from "@/types/nodule/nodule.type";
import { createContext, useState, type PropsWithChildren } from "react";

interface NoduleContext {
  currentNoduleId: number;
  nodules: Nodule[];
  updateNoduleField: <K extends keyof Nodule>(
    id: number,
    field: K,
    value: Nodule[K]
  ) => void;
  setCurrentNoduleId: (id: number) => void;
  addNodule: () => void;
}

export const NoduleContext = createContext({} as NoduleContext);

const getDefaultNodule = (id: number): Nodule => {
  return {
    id: id,
    lobe: "right",
    location: [],
    ap: "",
    cc: "",
    t: "",
    composition: "cannotBeAssessed",
    echogenicity: "cannotBeAssessed",
    margin: "cannotBeAssessed",
    isExtrathyroidalExtension: "no",
    extrathyroidalExtensionLocation: [],
    isCalcification: "no",
    calcificationType: [],
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

  const updateNoduleField = <K extends keyof Nodule>(
    id: number,
    field: K,
    value: Nodule[K]
  ) => {
    setNodules((prev) =>
      prev.map((nodule) =>
        nodule.id === id ? { ...nodule, [field]: value } : nodule
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
        updateNoduleField,
        setCurrentNoduleId,
        addNodule,
      }}
    >
      {children}
    </NoduleContext>
  );
};
