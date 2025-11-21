import type { LobeTranslation } from "@/types/lobe/lobe.type";

export const lobe: LobeTranslation = {
  id: {
    right: "Lóbulo derecho",
    left: "Lóbulo izquierdo",
    isthmus: "Istmo",
  },
  echogenicity: {
    homogeneous: "Homogénea",
    heterogeneous: "Heterogénea",
  },
  vascularity: {
    notEvaluated: "No evaluada",
    normal: "Normal",
    decreased: "Disminuida",
    increased: "Aumentada",
  },
};

export default lobe;
