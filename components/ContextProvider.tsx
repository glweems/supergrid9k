import { auth } from '@/store/auth';
import React from 'react';
import Modal from 'react-modal';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Box, Link } from 'rebass/styled-components';
import { useRecoilState } from 'recoil';
import { ThemeProvider } from 'styled-components/macro';
import theme from '@/lib/theme';
import { ui, useAuthModal } from '@/store/ui';
import useSWR from 'swr';
import Axios from 'axios';

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
const ContextProvider: React.FC<ContextProviderProps> = ({ children, session }) => {
  // const idk = React.useMemo(session, session);
  const [user, setUser] = useRecoilState(auth);
  React.useEffect(() => {
    if (!user && session) {
      setUser(session);
    }
  }, [session, setUser, user]);

  return (
    <ThemeProvider theme={theme}>
      <ReactQueryDevtools />
      <AuthModal />
      {children}
    </ThemeProvider>
  );
};

export default ContextProvider;
