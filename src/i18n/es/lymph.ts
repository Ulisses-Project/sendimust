import type { LymphNodeTranslation } from "@/types/lymph/lymph.type";

const lymph: LymphNodeTranslation = {
  laterality: {
    right: "Derecha",
    left: "Izquierda",
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
    cystic: "Características quísticas",
    microcalcifications: "Microcalcificaciones",
    highPeripheralVascularity: "Vascularización periférica elevada",
    thyroidLikeEchogenicity: "Ecogenicidad similar a la tiroides",
  },
  centralVascularity: {
    normal: "Normal",
    increased: "Aumentada",
  },
  ultrasoundAppearance: {
    normal: "Normal",
    indeterminate: "Indeterminado",
    suspicious: "Sospechoso",
  },
  headers: {
    laterality: "Lateralidad",
    compartment: "Compartimento",
    isSuspicious: "¿Es sospechoso?",
    suspiciousFeatures: "Características sospechosas",
    fattyHilum: "Hilio graso",
    centralVascularity: "Vascularidad central",
    ultrasoundAppearance: "Aspecto ecográfico",
    observations: "Observaciones",
    actions: "Acciones",
  },
  actions: {
    cleanRow: "Limpiar fila",
    deleteRow: "Eliminar fila",
    resetAll: "Resetear todo",
    addRow: "Añadir fila",
  },
  boolean: {
    yes: "Sí",
    no: "No",
  },
  dimensions: {
    ap: "AP",
    t: "T",
    cc: "CC",
  },
};

export default lymph;
