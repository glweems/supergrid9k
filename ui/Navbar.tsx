import UserDropdown from '@components/UserDropdown';
import { LogoIcon } from '@lib/Icons';
import { useUser } from '@lib/User';
import { Box, Flex, Header, StyledOcticon } from '@primer/components';
import Link from 'next/link';
import React from 'react';
import { useTheme } from 'styled-components';

const Navbar: React.FC = () => {
  const user = useUser();
  const { navbarHeight } = useTheme();
  return (
    <Header sx={{ height: navbarHeight }}>
      <Header.Item>
        <Link href="/">
          <Header.Link fontSize={2}>
            <StyledOcticon
              icon={() => (
                <div>
                  <LogoIcon />
                </div>
              )}
              size={32}
              mr={2}
            />
            <span>GitHub</span>
          </Header.Link>
        </Link>
      </Header.Item>
      <nav>
        <Link href="/">
          <Flex
            css={`
              place-items: center;
            `}
          >
            <Box as="h3" mx={3}></Box>
          </Flex>
        </Link>
      </nav>

      <Box>{user ? <UserDropdown /> : <Link href="/auth">login</Link>}</Box>
    </Header>
  );
};

export default Navbar;
