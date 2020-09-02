import React from 'react';
import { Flex, Text, Box, Link } from 'rebass/styled-components';
interface NavbarProps {
  title: React.ReactText | React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  return (
    <Flex px={2} color="white" bg="#242526" alignItems="center">
      <Text p={2} fontWeight="bold">
        {title}
      </Text>
      <Box mx="auto" />
      <Link variant="nav" href="#!">
        Profile
      </Link>
    </Flex>
  );
};

export default Navbar;
