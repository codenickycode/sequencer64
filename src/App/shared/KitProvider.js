import React, { useRef } from 'react';

export const Kit = React.createContext();
export const KitProvider = ({ children }) => {
  const kitRef = useRef({ name: 'init', samples: [{}] });

  return <Kit.Provider value={{ kitRef }}>{children}</Kit.Provider>;
};
