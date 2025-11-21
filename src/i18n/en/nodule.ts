import type { NoduleTranslation } from "@/types/nodule/nodule.type";

const nodule: NoduleTranslation = {
  lobe: {
    right: "Right",
    left: "Left",
    isthmus: "Isthmus",
    isthmusRight: "Isthmus/Right",
    isthmusLeft: "Isthmus/Left",
  },
  location: {
    superior: "Superior",
    middle: "Middle",
    inferior: "Inferior",
    entireLobe: "Entire lobe",
    anterior: "Anterior",
    posterior: "Posterior",
    medial: "Medial",
    lateral: "Lateral",
  },
  composition: {
    cannotBeAssessed: "Cannot be assessed",
    solid: "Solid",
    predominantlySolid: "Predominantly solid",
    mixedWithSolidArea: "Mixed, with eccentric solid area",
    mixedWithoutSolidArea: "Mixed, without eccentric solid area",
    spongiform: "Spongiform",
    simpleCyst: "Simple cyst",
  },
  echogenicity: {
    cannotBeAssessed: "Cannot be assessed",
    markedlyHypoechoic: "Markedly hypoechoic",
    hypoechoic: "Hypoechoic",
    isoechoic: "Isoechoic",
    hyperechoic: "Hyperechoic",
    heterogeneous: "Heterogeneous",
  },
  margin: {
    cannotBeAssessed: "Cannot be assessed",
    wellDefined: "Well-defined",
    illDefined: "Ill-defined",
    irregular: "Irregular",
    microlobulated: "Microlobulated",
    infiltrating: "Infiltrating",
  },
  isExtrathyroidalExtension: {
    yes: "Yes",
    no: "No",
  },
  extrathyroidalExtensionLocation: {
    anterior: "Anterior",
    posterior: "Posterior",
    medial: "Medial",
    lateral: "Lateral",
  },
  isCalcification: {
    yes: "Yes",
    no: "No/Reverberation artifacts",
  },
  calcificationType: {
    microcalcifications: "Microcalcifications",
    intranodularMacrocalcifications: "Intranodular macrocalcifications",
    regularPeripheralMacrocalcifications:
      "Fine and regular peripheral macrocalcifications",
    irregularPeripheralMacrocalcifications:
      "Irregular peripheral macrocalcifications",
    interruptedRimCalcifications: "Interrupted rim calcifications",
  },
  vascularity: {
    notEvaluated: "Not evaluated",
    peripheral: "Peripheral",
    mixed: "Mixed",
    internal: "Internal",
    nonVascularized: "Non-vascularized",
  },
  vascularityType: {
    low: "Low",
    moderate: "Moderate",
    high: "High",
  },
  isTallerThanWide: {
    yes: "Yes",
    no: "No",
  },
  isTallerThanLong: {
    yes: "Yes",
    no: "No",
  },
  tiRads: {
    TR1: "TR1 - Benign",
    TR2: "TR2 - Not suspicious",
    TR3: "TR3 - Mildly suspicious",
    TR4: "TR4 - Moderately suspicious",
    TR5: "TR5 - Highly suspicious",
  },
};

export default nodule;
