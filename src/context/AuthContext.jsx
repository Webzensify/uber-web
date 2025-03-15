import { createContext, useContext } from 'react';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContext = createContext();