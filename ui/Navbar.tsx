import React from 'react';

import { BoxProps, Flex, FlexProps, Heading } from 'rebass/styled-components';
import { useUser } from '../store/auth';
import UserDropdown from '../components/UserDropdown';
import { LogoIcon } from '../lib/Icons';
import Link from './Link';
import Box from '@/ui/Box';
import { useRecoilState } from 'recoil';
import { ui } from '../store/ui';
interface NavbarProps {
  title?: React.ReactText | React.ReactNode;
  flexProps?: FlexProps;
  boxProps?: BoxProps;
  Heading?: React.FC<any>;
  headingProps?: any;
}

const Navbar: React.FC<NavbarProps> = ({
  title,
  children,
  flexProps,
  boxProps,
  headingProps,
}) => {
  const user = useUser();
  const [{ navbarHeight }] = useRecoilState(ui);

  return (
    <Flex as="header" {...flexProps} height={navbarHeight}>
      <Heading p={2} fontWeight="bold" {...headingProps}>
        <Box display="flex" alignItems="center" alignContent="center">
          <LogoIcon />
          {title}
        </Box>
      </Heading>
      <Box as="nav" {...boxProps}>
        {children}
      </Box>

      <Box>{user ? <UserDropdown /> : <Link href="/auth">login</Link>}</Box>
    </Flex>
  );
};

Navbar.defaultProps = {
  title: <Link href="/">Super Grid 9K</Link>,
  flexProps: {
    px: 2,
    color: 'text',
    bg: 'secondary',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

export default Navbar;
