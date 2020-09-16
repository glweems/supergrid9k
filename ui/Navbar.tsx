import React from 'react';
import NextLink from 'next/link';

import { Box, BoxProps, Flex, FlexProps, Heading, Link } from 'rebass/styled-components';
import { useUser } from '../store/auth';
import UserDropdown from '../components/UserDropdown';

interface NavbarProps {
  title?: React.ReactText | React.ReactNode;
  flexProps?: FlexProps;
  boxProps?: BoxProps;
  Heading?: React.FC<any>;
  headingProps?: any;
}

const Navbar: React.FC<NavbarProps> = ({ title, children, flexProps, boxProps, headingProps }) => {
  const user = useUser();

  return (
    <Flex as="header" {...flexProps}>
      <Box>
        {title && (
          <Heading p={2} fontWeight="bold" {...headingProps}>
            {title}
          </Heading>
        )}
      </Box>
      <Box as="nav" {...boxProps}>
        {children}
      </Box>

      <Box>
        {user ? (
          <UserDropdown />
        ) : (
          <Link as={NextLink} href="/auth">
            login
          </Link>
        )}
      </Box>
    </Flex>
  );
};

Navbar.defaultProps = {
  title: (
    <Link as={NextLink} href="/">
      Super Grid 9K
    </Link>
  ),
  flexProps: {
    px: 2,
    color: 'text',
    bg: 'secondary',
    alignItems: 'center',
  },
};

export default Navbar;
