import type { Nodule } from "@/types/nodule/nodule.type";
import { createContext, useState, type PropsWithChildren } from "react";
import { calculateNoduleRatios } from "@/lib/helpers/nodule";
import { calculateTiRads } from "@/lib/helpers/tirads";

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
    tiRads: "TR1",
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

  //* Initialize maxId based on initial nodules
  const [maxId, setMaxId] = useState(nodules.length);

  const updateNoduleField = <K extends keyof Nodule>(
    id: number,
    field: K,
    value: Nodule[K]
  ) => {
    setNodules((prev) =>
      prev.map((nodule) => {
        if (nodule.id !== id) return nodule;

        let updatedNodule = { ...nodule, [field]: value };

        //* If composition changes to simpleCyst, reset other fields to defaults
        if (field === "composition" && value === "simpleCyst") {
          updatedNodule = {
            ...updatedNodule,
            echogenicity: "cannotBeAssessed",
            margin: "cannotBeAssessed",
            isExtrathyroidalExtension: "no",
            extrathyroidalExtensionLocation: [],
            isCalcification: "no",
            calcificationType: [],
            vascularity: "notEvaluated",
            vascularityType: "low",
          };
        }

        //* Auto-calculate ratios if dimensions change
        if (field === "ap" || field === "cc" || field === "t") {
          const { isTallerThanWide, isTallerThanLong } = calculateNoduleRatios(
            updatedNodule.ap,
            updatedNodule.cc,
            updatedNodule.t
          );

          updatedNodule.isTallerThanWide = isTallerThanWide;
          updatedNodule.isTallerThanLong = isTallerThanLong;
        }

        //* Auto-calculate TI-RADS when relevant fields change
        if (
          field === "composition" ||
          field === "echogenicity" ||
          field === "margin" ||
          field === "isExtrathyroidalExtension" ||
          field === "isCalcification" ||
          field === "calcificationType" ||
          field === "isTallerThanWide" ||
          field === "ap" ||
          field === "cc" ||
          field === "t"
        ) {
          updatedNodule.tiRads = calculateTiRads(updatedNodule);
        }

        return updatedNodule;
      })
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
    //* Prevent deleting the last nodule
    if (nodules.length <= 1) {
      return;
    }

    const currentIndex = nodules.findIndex((n) => n.id === id);
    const updatedNodules = nodules.filter((n) => n.id !== id);

    //* If the deleted nodule is the current one, switch to the nearest nodule
    const newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    setCurrentNoduleId(updatedNodules[newIndex].id);

    //* Update maxId if deleting the last nodule
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
