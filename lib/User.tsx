import React, { useContext, createContext, FC } from 'react';
import { SuperGrid9kUser } from './auth/mapUserData';

//type SuperGrid9kUser = {};

const UserContext = createContext<SuperGrid9kUser | undefined>(undefined);

export const UserContextProvider: FC<{ value: SuperGrid9kUser }> = ({
  value,
  children,
}) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUser() {
  return useContext(UserContext);
}
