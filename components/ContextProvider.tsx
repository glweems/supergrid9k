import theme from '@/lib/theme';
import React from 'react';
import { ThemeProvider } from 'styled-components/macro';
import { SWRConfig } from 'swr';
import useAuth from '../lib/auth/useAuth';
import { fetcher } from '../lib/fetcher';
import { AuthModal } from './AuthModal';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
interface ContextProviderProps {
  session?: any;
}
const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  useAuth();
  return (
    <ThemeProvider theme={theme}>
      <AuthModal />
      <SWRConfig value={{ fetcher }}>
        <DndProvider backend={HTML5Backend}>{children}</DndProvider>
      </SWRConfig>
    </ThemeProvider>
  );
};

export default ContextProvider;
