import { ArrowShortLeftIcon, ArrowShortRightIcon } from '@/lib/Icons';
import { ui, useGridEditorUi } from '@/store/ui';
import React from 'react';
import { Box, Button, Flex, Text } from 'rebass/styled-components';
import { useRecoilState } from 'recoil';
import UserDropdown from '../components/UserDropdown';
import { auth } from '../store/auth';

interface NavbarProps {
  title: React.ReactText | React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const { isControlsOpen, handleClick } = useGridEditorUi();
  const [, setUiState] = useRecoilState(ui);
  const [user] = useRecoilState(auth);
  const handleClicks: React.MouseEventHandler<HTMLButtonElement> = () => {
    setUiState((state) => ({ ...state, isAuthModalOpen: true }));
  };
  return (
    <Flex px={2} color="#fff" bg="secondary" alignItems="center">
      <Button name="isControlsOpen" bg="secondary" onClick={handleClick}>
        {isControlsOpen ? <ArrowShortLeftIcon /> : <ArrowShortRightIcon />}
      </Button>
      <Text p={2} fontWeight="bold">
        {title}
      </Text>
      <Box mx="auto" />
      {user ? <UserDropdown user={user} /> : <Button onClick={handleClicks}>Login</Button>}
    </Flex>
  );
};

export default Navbar;
