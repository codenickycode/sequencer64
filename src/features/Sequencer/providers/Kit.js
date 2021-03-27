import React, { useRef } from 'react';

export const Kit = React.createContext();
export const KitProvider = ({ children }) => {
  const kitRef = useRef({ name: 'init', samples: [{}] });

  // console.log('returning: KitProvider');
  return <Kit.Provider value={{ kitRef }}>{children}</Kit.Provider>;
};
