import type {
  CalcificationType,
  Composition,
  Echogenicity,
  Margin,
  Nodule,
  TiRads,
} from "@/types/nodule/nodule.type";

//* TI-RADS Scoring Rules Type
export type TiRadsScoring = {
  composition: Record<Composition, number>;
  echogenicity: Record<Echogenicity, number>;

  tallerThanWide: number;

  margin: Record<Margin, number>;
  extrathyroidalExtension: number;
  calcifications: Record<CalcificationType, number>;
};

//! Revisar!! TI-RADS Scoring Rules Configuration
const TIRADS_SCORING_RULES: TiRadsScoring = {
  composition: {
    simpleCyst: 0,
    spongiform: 0,
    mixedWithoutSolidArea: 1,
    mixedWithSolidArea: 1,
    predominantlySolid: 2,
    solid: 2,
    cannotBeAssessed: 0,
  },
  echogenicity: {
    hyperechoic: 1,
    isoechoic: 1,
    cannotBeAssessed: 1,
    hypoechoic: 2,
    markedlyHypoechoic: 3,
    heterogeneous: 1,
  },
  tallerThanWide: 3,
  margin: {
    wellDefined: 0,
    illDefined: 0,
    microlobulated: 2,
    irregular: 2,
    infiltrating: 2,
    cannotBeAssessed: 0,
  },
  extrathyroidalExtension: 3,
  calcifications: {
    intranodularMacrocalcifications: 1,
    regularPeripheralMacrocalcifications: 2,
    interruptedRimCalcifications: 2,
    irregularPeripheralMacrocalcifications: 2,
    microcalcifications: 3,
  },
};

export const calculateTiRadsPoints = (nodule: Nodule): number => {
  //* If composition is simple cyst, it's always TR1 (0 points)
  if (nodule.composition === "simpleCyst") {
    return 0;
  }

  let points = 0;

  //* Composition
  points += TIRADS_SCORING_RULES.composition[nodule.composition];

  //* Echogenicity
  points += TIRADS_SCORING_RULES.echogenicity[nodule.echogenicity];

  //* Shape (taller than wide)
  points +=
    nodule.isTallerThanWide === "yes" ? TIRADS_SCORING_RULES.tallerThanWide : 0;

  //* Margin or Extrathyroidal Extension
  //! Note: If extrathyroidal extension exists, it takes precedence over margin scoring
  points +=
    nodule.isExtrathyroidalExtension === "yes"
      ? TIRADS_SCORING_RULES.extrathyroidalExtension
      : TIRADS_SCORING_RULES.margin[nodule.margin];

  //* Calcifications (Echogenic Foci)
  if (nodule.isCalcification === "yes" && nodule.calcificationType.length > 0) {
    //* Get the sum of points from all calcification types present
    const calcificationPoints = nodule.calcificationType
      .map((type) => TIRADS_SCORING_RULES.calcifications[type])
      .reduce((sum, points) => sum + points, 0);
    points += calcificationPoints;
  }

  return points;
};

export const getTiRadsLevel = (points: number): TiRads => {
  if (points === 0) return "TR1";
  if (points === 2) return "TR2";
  if (points === 3) return "TR3";
  if (points >= 4 && points <= 6) return "TR4";
  return "TR5"; // 7 or more points
};

export const calculateTiRads = (nodule: Nodule): TiRads => {
  const points = calculateTiRadsPoints(nodule);
  return getTiRadsLevel(points);
};

//* Get TI-RADS color for UI styling
export const getTiRadsColor = (tiRads: TiRads): string => {
  switch (tiRads) {
    case "TR1":
    case "TR2":
      return "#6F97ED"; // Blue
    case "TR3":
      return "#56F598"; // Green
    case "TR4":
      return "#EDC44A"; // Yellow
    case "TR5":
      return "#ED4C4C"; // Red
    default:
      return "#6F97ED"; // Default blue
  }
};

//* Get darker TI-RADS border color for UI styling
export const getTiRadsBorderColor = (tiRads: TiRads): string => {
  switch (tiRads) {
    case "TR1":
    case "TR2":
      return "#5A7DD1"; // Darker blue
    case "TR3":
      return "#3FD97E"; // Darker green
    case "TR4":
      return "#D1A735"; // Darker yellow
    case "TR5":
      return "#D13838"; // Darker red
    default:
      return "#5A7DD1"; // Default darker blue
  }
};
