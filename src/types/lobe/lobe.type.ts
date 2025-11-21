export interface ThyroidalLobes {
  lobes: Lobe[];
  globalEchogenicity: GlobalEchogenicity;
  globalVascularity: GlobalVascularity;
  observations: string;
}

export interface Lobe {
  location: Location;
  ap: string;
  cc?: string;
  t?: string;
  isAbsent: boolean;
  isDefault: boolean;
}

export type Location = "right" | "left" | "isthmus";

export type GlobalEchogenicity = "homogeneous" | "heterogeneous";

export type GlobalVascularity =
  | "notEvaluated"
  | "normal"
  | "decreased"
  | "increased";

export interface LobeTranslation {
  id: Record<Location, string>;
  echogenicity: Record<GlobalEchogenicity, string>;
  vascularity: Record<GlobalVascularity, string>;
}
