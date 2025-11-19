import type { NoduleTranslation } from "@/types/nodule/nodule.type";

const nodule: NoduleTranslation = {
  lobe: {
    right: "Derecho",
    left: "Izquierdo",
    isthmus: "Istmo",
    isthmusRight: "Istmo/Derecho",
    isthmusLeft: "Istmo/Izquierdo",
  },
  location: {
    superior: "Superior",
    middle: "Medio",
    inferior: "Inferior",
    entireLobe: "Todo el lóbulo",
    anterior: "Anterior",
    posterior: "Posterior",
    medial: "Medial",
    lateral: "Lateral",
  },
  composition: {
    cannotBeAssessed: "No evaluable",
    solid: "Sólido",
    predominantlySolid: "Predominantemente sólido",
    mixedWithSolidArea: "Mixto, CON área sólida excéntrica",
    mixedWithoutSolidArea: "Mixto, SIN área sólida excéntrica",
    spongiform: "Espongiforme",
    simpleCyst: "Quiste simple",
  },
  echogenicity: {
    cannotBeAssessed: "No evaluable",
    markedlyHypoechoic: "Marcadamente hipoecoico",
    hypoechoic: "Hipoecoico",
    isoechoic: "Isoecoico",
    hyperechoic: "Hiperecoico",
    heterogeneous: "Heteroecoico",
  },
  margin: {
    cannotBeAssessed: "No evaluable",
    wellDefined: "Bien delimitado",
    illDefined: "Mal delimitado",
    irregular: "Irregular",
    microlobulated: "Microlobular",
    infiltrating: "Infiltrante",
  },
  extrathyroidalExtensionLocation: {
    anterior: "Anterior",
    posterior: "Posterior",
    medial: "Medial",
    lateral: "Lateral",
  },
  calcificationType: {
    microcalcifications: "Microcalcificaciones",
    intranodularMacrocalcifications: "Macrocalcificaciones intranodulares",
    regularPeripheralMacrocalcifications:
      "Macrocalcificaciones periféricas finas y regulares",
    irregularPeripheralMacrocalcifications:
      "Macrocalcificaciones periféricas irregulares",
    interruptedRimCalcifications:
      "Macrocalcificaciones periféricas interrumpidas",
  },
  vascularity: {
    notEvaluated: "No evaluada",
    peripheral: "Periférica",
    mixed: "Mixta",
    internal: "Central",
    nonVascularized: "No vascularizado",
  },
  vascularityType: {
    low: "Escasa",
    moderate: "Moderada",
    high: "Elevada",
  },
  isTallerThanWide: {
    yes: "Sí",
    no: "No",
  },
  isTallerThanLong: {
    yes: "Sí",
    no: "No",
  },
};

export default nodule;
