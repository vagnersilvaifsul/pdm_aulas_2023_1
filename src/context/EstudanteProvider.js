import React, {createContext} from 'react';

export const EstudanteContext = createContext({});

export const EstudanteProvider = ({children}) => {
  return (
    <EstudanteContext.Provider value={{}}>
      {children}
    </EstudanteContext.Provider>
  );
};
