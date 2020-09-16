import { ui, useAuthModal } from '@/store/ui';
import React from 'react';
import Modal from 'react-modal';
import { Box, Link } from 'rebass/styled-components';
import { useRecoilState } from 'recoil';

Modal.setAppElement('#__next');
export const AuthModal = () => {
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
