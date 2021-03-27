import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { setLS } from '../../../utils/storage';

export const PatternRef = React.createContext();
export const PatternRefProvider = ({ children }) => {
  const pattern = useSelector((state) => state.sequence.present.pattern);

  const patternRef = useRef(pattern);
  useEffect(() => {
    patternRef.current = pattern;
    setLS('pattern', patternRef.current);
  }, [pattern]);

  const cellsRef = useRef({});

  // console.log('returning: PatternRefProvider');
  return (
    <PatternRef.Provider value={{ patternRef, cellsRef }}>
      {children}
    </PatternRef.Provider>
  );
};
