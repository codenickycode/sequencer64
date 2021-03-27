import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

export const PatternRef = React.createContext();
export const PatternRefProvider = ({ children }) => {
  const pattern = useSelector((state) => state.sequence.present.pattern);

  const patternRef = useRef(pattern);
  useEffect(() => {
    patternRef.current = pattern;
  }, [pattern]);

  // console.log('returning: PatternRefProvider');
  return (
    <PatternRef.Provider value={{ patternRef }}>{children}</PatternRef.Provider>
  );
};
