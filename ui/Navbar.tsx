import { LogoIcon } from '@lib/Icons';
import { colors } from '@lib/theme';
import Link from 'next/link';
import React, { FC } from 'react';
import styled from 'styled-components';

const Navbar: FC = () => (
  <Header>
    <LogoIcon />
    <Link href="/">
      <a href="/" aria-label="homepage">
        <div>Super Grid 9K</div>
      </a>
    </Link>
  </Header>
);

const Header = styled.header`
  display: flex;
  place-items: center;
  height: ${(props) => props.theme.navbarHeight};
  padding-left: 1rem;
  background-color: ${colors.base};
  border-bottom: 4px solid ${colors.baseShade};
  svg {
    margin-right: 1rem;
  }
`;

export default Navbar;
