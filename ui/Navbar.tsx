import Box from '@/ui/Box';
import Link from 'next/link';
import React from 'react';
import { Flex } from 'rebass/styled-components';
import styled, { useTheme } from 'styled-components';
import UserDropdown from '../components/UserDropdown';
import { LogoIcon } from '../lib/Icons';
import { useUser } from '../lib/User';
import { Header, StyledOcticon } from '@primer/components';
const Navbar: React.FC = () => {
  const user = useUser();
  const { navbarHeight } = useTheme();
  return (
    <Header>
      <Header.Item href="/" as={Link}>
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

const Headers = styled.header`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  height: ${({ theme }) => theme.navbarHeight};
  min-height: 4rem;
  padding: 0.5rem 1rem;
  background-color: var(--color-primary);
  box-shadow: rgba(0, 0, 0, 0.05) 0 0.5rem 1rem,
    rgba(0, 0, 0, 0.1) 0 -1px 0 inset;
`;

export default Navbar;
