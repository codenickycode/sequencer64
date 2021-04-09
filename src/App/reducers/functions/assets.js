export const deepCopyKits = (kits) => {
  const copyOfKits = {};
  Object.entries(kits).forEach(([key, val]) => {
    const copyOfSamples = val.samples.map((sample) => ({ ...sample }));
    copyOfKits[key] = { ...val, samples: copyOfSamples };
  });
  return copyOfKits;
};
