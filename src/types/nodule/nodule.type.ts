export interface Nodule {
  id: number;
  lobe: Lobe;
  location: Location;
  ap: string;
  cc: string;
  t: string;
  composition: Composition;
  echogenicity: Echogenicity;
  margin: Margin;
  isExtrathyroidalExtension: boolean;
  extrathyroidalExtensionLocation: ExtrathyroidalExtensionLocation;
  isCalcification: boolean;
  calcificationType: CalcificationType;
  vascularity: Vascularity;
  vascularityType: VascularityType;
  isTallerThanWide: string;
  isTallerThanLong: string;
  categories: string[];
  observations: string;
}

export interface NoduleTranslation {
  lobe: Record<Lobe, string>;
  location: Record<Location, string>;
  composition: Record<Composition, string>;
  echogenicity: Record<Echogenicity, string>;
  margin: Record<Margin, string>;
  extrathyroidalExtensionLocation: Record<
    ExtrathyroidalExtensionLocation,
    string
  >;
  calcificationType: Record<CalcificationType, string>;
  vascularity: Record<Vascularity, string>;
  vascularityType: Record<VascularityType, string>;
  isTallerThanWide: Record<string, string>;
  isTallerThanLong: Record<string, string>;
}

export type Lobe =
  | "right"
  | "left"
  | "isthmus"
  | "isthmusRight"
  | "isthmusLeft";

export type Location =
  | "superior"
  | "middle"
  | "inferior"
  | "entireLobe"
  | "anterior"
  | "posterior"
  | "medial"
  | "lateral";

export type Composition =
  | "cannotBeAssessed"
  | "solid"
  | "predominantlySolid"
  | "mixedWithSolidArea"
  | "mixedWithoutSolidArea"
  | "spongiform"
  | "simpleCyst";

export type Echogenicity =
  | "cannotBeAssessed"
  | "markedlyHypoechoic"
  | "hypoechoic"
  | "isoechoic"
  | "hyperechoic"
  | "heterogeneous";

export type Margin =
  | "cannotBeAssessed"
  | "wellDefined"
  | "illDefined"
  | "irregular"
  | "microlobulated"
  | "infiltrating";

export type ExtrathyroidalExtensionLocation =
  | "anterior"
  | "posterior"
  | "medial"
  | "lateral";

export type CalcificationType =
  | "microcalcifications"
  | "intranodularMacrocalcifications"
  | "regularPeripheralMacrocalcifications"
  | "irregularPeripheralMacrocalcifications"
  | "interruptedRimCalcifications";

export type Vascularity =
  | "notEvaluated"
  | "peripheral"
  | "mixed"
  | "internal"
  | "nonVascularized";

export type VascularityType = "low" | "moderate" | "high";
