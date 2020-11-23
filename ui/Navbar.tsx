import { LogoIcon } from '@lib/Icons';
import { colors } from '@lib/theme';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Navbar: React.FC = () => {
  return (
    <Header>
      <Link href="/">
        <span>
          <LogoIcon />
          Super Grid 9K
        </span>
      </Link>
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  place-items: center;
  height: ${(props) => props.theme.navbarHeight};
  background-color: ${colors.base};
  border-bottom: 4px solid ${colors.baseShade};
`;

export default Navbar;
