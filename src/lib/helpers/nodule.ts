import type { Nodule } from "@/types/nodule/nodule.type";

//* Rules:
//* Taller than Wide: AP > CC * 1.2
//* Taller than Long: AP > T * 1.2

export const calculateNoduleRatios = (ap: string, cc: string, t: string) => {
  const apVal = parseFloat(ap || "0");
  const ccVal = parseFloat(cc || "0");
  const tVal = parseFloat(t || "0");

  return {
    isTallerThanWide:
      apVal > 0 && ccVal > 0 && apVal > ccVal * 1.2 ? "yes" : "no",
    isTallerThanLong:
      apVal > 0 && tVal > 0 && apVal > tVal * 1.2 ? "yes" : "no",
  };
};

// Generic helper to toggle values in array fields
export const toggleArrayField = (
  currentNodule: Nodule,
  field: keyof Nodule,
  value: string,
  updateNoduleField: (id: number, field: keyof Nodule, value: any) => void
) => {
  const currentValues = (currentNodule[field] as string[]) || [];
  const updated = currentValues.includes(value)
    ? currentValues.filter((item) => item !== value)
    : [...currentValues, value];

  updateNoduleField(currentNodule.id, field, updated as any);
};
