import { auth } from '@/store/auth';
import Axios from 'axios';
import React from 'react';
import Modal from 'react-modal';
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Box, Link } from 'rebass/styled-components';
import { useRecoilState } from 'recoil';
import { ThemeProvider } from 'styled-components/macro';
import { githubSessionToUserObj } from '../lib/passport/github';
import theme from '../lib/theme';
import { checkuser } from '../models/User';
import { ui, useAuthModal } from '../store/ui';
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
  session: any;
}
const ContextProvider: React.FC<ContextProviderProps> = ({ children, ...props }) => {
  console.log(props);

  return (
    <ThemeProvider theme={theme}>
      <ReactQueryDevtools />
      <AuthModal />
      {children}
    </ThemeProvider>
  );
};

export default ContextProvider;
