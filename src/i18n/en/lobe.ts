import type { LobeTranslation } from "@/types/lobe/lobe.type";

const lobe: LobeTranslation = {
  id: {
    right: "Right Lobe",
    left: "Left Lobe",
    isthmus: "Isthmus",
  },
  echogenicity: {
    homogeneous: "Homogeneous",
    heterogeneous: "Heterogeneous",
  },
  vascularity: {
    notEvaluated: "Not Evaluated",
    normal: "Normal",
    decreased: "Decreased",
    increased: "Increased",
  },
};

export default lobe;
