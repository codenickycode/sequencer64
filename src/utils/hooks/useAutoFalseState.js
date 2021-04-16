import { useEffect, useState } from 'react';

export const useAutoFalseState = (timeout) => {
  const [bool, setBool] = useState(false);
  useEffect(() => {
    if (bool) setTimeout(() => setBool(false), timeout);
  }, [bool, timeout]);
  return [bool, setBool];
};
