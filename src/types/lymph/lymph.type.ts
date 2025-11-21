export interface LymphNode {
  id: number;
  laterality: Laterality;
  compartment: Compartment;
  ap: string;
  t: string;
  cc: string;
  isSuspicious: boolean;
  suspiciousFeatures: SuspiciousFeature[];
  hasFattyHilum: boolean;
  centralVascularity: CentralVascularity;
  observations: string;
  ultrasoundAppearance: UltrasoundAppearance;
}

export interface LymphNodeTranslation {
  laterality: Record<Laterality, string>;
  compartment: Record<Compartment, string>;
  suspiciousFeatures: Record<SuspiciousFeature, string>;
  centralVascularity: Record<CentralVascularity, string>;
  ultrasoundAppearance: Record<UltrasoundAppearance, string>;
  headers: {
    laterality: string;
    compartment: string;
    isSuspicious: string;
    suspiciousFeatures: string;
    fattyHilum: string;
    centralVascularity: string;
    ultrasoundAppearance: string;
    observations: string;
    actions: string;
  };
  actions: {
    cleanRow: string;
    deleteRow: string;
    resetAll: string;
    addRow: string;
  };
  boolean: {
    yes: string;
    no: string;
  };
  dimensions: {
    ap: string;
    t: string;
    cc: string;
  };
}

export type Laterality = "right" | "left";

export type Compartment = "I" | "II" | "III" | "IV" | "V" | "VI" | "VII";

export type SuspiciousFeature =
  | "cystic"
  | "microcalcifications"
  | "highPeripheralVascularity"
  | "thyroidLikeEchogenicity";

export type CentralVascularity = "normal" | "increased";

export type UltrasoundAppearance = "normal" | "indeterminate" | "suspicious";
