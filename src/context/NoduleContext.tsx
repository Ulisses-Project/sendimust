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
  removeNodule: (id: number, type: "delete" | "biopsy") => void;
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
  // Initialize maxId based on initial nodules
  const [maxId, setMaxId] = useState(2);

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

  const addNodule = () => {
    const newId = maxId + 1;
    const newNodule = getDefaultNodule(newId);
    setMaxId(newId);
    setNodules((prev) => [...prev, newNodule]);
    setCurrentNoduleId(newId);
  };

  const removeNodule = (id: number, type: "delete" | "biopsy") => {
    const currentIndex = nodules.findIndex((n) => n.id === id);
    const updatedNodules = nodules.filter((n) => n.id !== id);

    if (id === currentNoduleId && updatedNodules.length > 0) {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
      setCurrentNoduleId(updatedNodules[newIndex].id);
    }

    if (type === "delete" && id === maxId) {
      const newMaxId =
        updatedNodules.length > 0
          ? Math.max(...updatedNodules.map((n) => n.id))
          : 0;
      setMaxId(newMaxId);
    }

    setNodules(updatedNodules);
  };

  return (
    <NoduleContext
      value={{
        currentNoduleId,
        nodules,
        updateNoduleField,
        setCurrentNoduleId,
        addNodule,
        removeNodule,
      }}
    >
      {children}
    </NoduleContext>
  );
};
