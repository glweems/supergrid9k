import React from 'react';
import { Box, BoxProps, Flex, FlexProps, Heading } from 'rebass/styled-components';

interface NavbarProps {
  title?: React.ReactText | React.ReactNode;
  flexProps?: FlexProps;
  boxProps?: BoxProps;
  Heading?: React.FC<any>;
  headingProps?: any;
}

const Navbar: React.FC<NavbarProps> = ({ title, children, flexProps, boxProps, headingProps }) => {
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
    </Flex>
  );
};

Navbar.defaultProps = {
  title: 'Super Grid 9k',
  flexProps: {
    px: 2,
    color: 'text',
    bg: 'secondary',
    alignItems: 'center',
  },
};

export default Navbar;
