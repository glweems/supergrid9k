import React from 'react';
import { Box, Button, Flex, Link, Text } from 'rebass/styled-components';
import { ArrowShortLeftIcon, ArrowShortRightIcon } from '../lib/Icons';
import { useGridEditorUi } from '../store/ui';
interface NavbarProps {
  title: React.ReactText | React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const { isControlsOpen, handleClick } = useGridEditorUi();
  return (
    <Flex px={2} color="#fff" bg="secondary" alignItems="center">
      <Button name="isControlsOpen" bg="secondary" onClick={handleClick}>
        {isControlsOpen ? <ArrowShortLeftIcon /> : <ArrowShortRightIcon />}
      </Button>
      <Text p={2} fontWeight="bold">
        {title}
      </Text>
      <Box mx="auto" />
      <Link variant="nav" href="/api/auth/github">
        Profile
      </Link>
    </Flex>
  );
};

export default Navbar;
