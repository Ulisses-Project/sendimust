import type { LymphNodeTranslation } from "@/types/lymph/lymph.type";

const lymph: LymphNodeTranslation = {
  laterality: {
    right: "Right",
    left: "Left",
  },
  compartment: {
    I: "I",
    II: "II",
    III: "III",
    IV: "IV",
    V: "V",
    VI: "VI",
    VII: "VII",
  },
  suspiciousFeatures: {
    cystic: "Cystic features",
    microcalcifications: "Microcalcifications",
    highPeripheralVascularity: "High peripheral vascularity",
    thyroidLikeEchogenicity: "Thyroid-like echogenicity",
  },
  centralVascularity: {
    normal: "Normal",
    increased: "Increased",
  },
  ultrasoundAppearance: {
    normal: "Normal",
    indeterminate: "Indeterminate",
    suspicious: "Suspicious",
  },
  headers: {
    laterality: "Laterality",
    compartment: "Compartment",
    isSuspicious: "Is Suspicious?",
    suspiciousFeatures: "Suspicious Features",
    fattyHilum: "Fatty Hilum",
    centralVascularity: "Central Vascularity",
    ultrasoundAppearance: "Ultrasound Appearance",
    observations: "Observations",
    actions: "Actions",
  },
  actions: {
    cleanRow: "Clean Row",
    deleteRow: "Delete Row",
    resetAll: "Reset All",
    addRow: "Add Row",
  },
  boolean: {
    yes: "Yes",
    no: "No",
  },
  dimensions: {
    ap: "AP",
    t: "T",
    cc: "CC",
  },
};

export default lymph;
