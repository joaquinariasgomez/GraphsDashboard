import React, { createContext, useContext, useReducer } from 'react';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ globalReducer, initialState, children }) => (
  <GlobalStateContext.Provider value={useReducer(globalReducer, initialState)}>
    {children}
  </GlobalStateContext.Provider>
);

export const useGlobalStateValue = () => useContext(GlobalStateContext);