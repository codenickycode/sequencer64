import { useEffect, useState } from 'react';

export const useSetTrueForCallback = (func) => {
  const [bool, setBool] = useState(false);
  useEffect(() => {
    if (!bool) return;
    func();
    setBool(false);
  }, [bool, func]);
  return setBool;
};
