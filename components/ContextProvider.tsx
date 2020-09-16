import theme from '@/lib/theme';
import React from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import { ThemeProvider } from 'styled-components/macro';
import { SWRConfig } from 'swr';
import useAuth from '../lib/auth/useAuth';
import { fetcher } from '../lib/fetcher';
import { AuthModal } from './AuthModal';
interface ContextProviderProps {
  session?: any;
}
const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  useAuth();
  return (
    <ThemeProvider theme={theme}>
      <AuthModal />
      <ReactQueryDevtools />
      <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
    </ThemeProvider>
  );
};

export default ContextProvider;
