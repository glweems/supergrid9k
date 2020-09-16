import theme from '@/lib/theme';
import { ui, useAuthModal } from '@/store/ui';
import React from 'react';
import Modal from 'react-modal';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Box, Link } from 'rebass/styled-components';
import { useRecoilState } from 'recoil';
import { ThemeProvider } from 'styled-components/macro';
import useAuth from '../lib/auth/useAuth';

Modal.setAppElement('#__next');
const AuthModal = () => {
  const [state] = useAuthModal();
  const [, setUiState] = useRecoilState(ui);
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setUiState((state) => ({ ...state, isAuthModalOpen: false }));
  };
  return (
    <Modal isOpen={state as any} onRequestClose={handleClick}>
      <Box marginX="auto" bg="muted" p={3}>
        <Link href="/api/auth/github">Login with github</Link>
      </Box>
    </Modal>
  );
};
interface ContextProviderProps {
  session?: any;
}
const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  useAuth();

  return (
    <ThemeProvider theme={theme}>
      <AuthModal />
      <ReactQueryDevtools />
      {children}
    </ThemeProvider>
  );
};

export default ContextProvider;
