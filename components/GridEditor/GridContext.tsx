import React, { useContext, createContext, FC } from 'react';
import { ConfigInterface, SWRInfiniteConfigInterface } from 'swr';
import { GridState } from '../../store/grid';

type GridEditorContextState = [
  endpoint: string,
  config: ConfigInterface<GridState>
];

const GridEditorContext = createContext<GridEditorContextState | undefined>(
  undefined
);

export const GridEditorContextProvider: FC<{
  value: GridEditorContextState;
}> = ({ value, children }) => {
  return (
    <GridEditorContext.Provider value={value}>
      {children}
    </GridEditorContext.Provider>
  );
};

export function useGridEditorContext() {
  return useContext(GridEditorContext);
}
