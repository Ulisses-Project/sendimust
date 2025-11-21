export interface LymphNode {
  id: number;
  compartment: string;
  ap: string;
  t: string;
  cc: string;
  ultrasoundAppearance: UltrasoundAppearance;
  observations: string;
}

export interface LymphNodeTranslation {
  ultrasoundAppearance: Record<UltrasoundAppearance, string>;
}

export type UltrasoundAppearance = "normal" | "indeterminate" | "suspicious";
