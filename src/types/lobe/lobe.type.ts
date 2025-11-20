export interface ThyroidalLobes {
  lobes: Lobe[];
  globalEchogenicity: GlobalEchogenicity;
  globalVascularity: GlobalVascularity;
  observations: string;
}

export interface Lobe {
  id: LobeId;
  ap: string;
  cc: string;
  t: string;
  isAbsent: boolean;
  isDefault: boolean;
}

export type LobeId = "right" | "left" | "isthmus";

export type GlobalEchogenicity = "homogeneous" | "heterogeneous";

export type GlobalVascularity =
  | "notEvaluated"
  | "normal"
  | "decreased"
  | "increased";

export interface LobeTranslation {
  id: Record<LobeId, string>;
  echogenicity: Record<GlobalEchogenicity, string>;
  vascularity: Record<GlobalVascularity, string>;
}
