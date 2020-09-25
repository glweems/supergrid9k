import theme from '@/lib/theme';
import React from 'react';
import { ThemeProvider } from 'styled-components/macro';
import { SWRConfig } from 'swr';
import useAuth from '../lib/auth/useAuth';
import { fetcher } from '../lib/fetcher';
import { AuthModal } from './AuthModal';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAnalytics } from '@happykit/analytics';

interface ContextProviderProps {
  session?: any;
}
const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  useAuth();
  useAnalytics({ publicKey: 'analytics_pub_c0b2081ea0' });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ContextProvider;
