import { useContext } from 'react';
import { AuthContext, AuthContextDataProps } from '../contexts/AuthContext';

export const UseAuth = (): AuthContextDataProps => {
  const context = useContext(AuthContext);
  return context;
}