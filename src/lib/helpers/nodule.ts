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
