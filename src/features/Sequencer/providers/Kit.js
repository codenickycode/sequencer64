import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

export const Kit = React.createContext();
export const KitProvider = ({ children }) => {
  const kit = useSelector((state) => state.tone.kit);
  const kitRef = useRef(kit);

  // console.log('returning: KitProvider');
  return (
    <Kit.Provider
      value={{
        kitRef,
      }}
    >
      {children}
    </Kit.Provider>
  );
};
