import { LogoIcon } from '@lib/Icons';
import { Header, StyledOcticon } from '@primer/components';
import Link from 'next/link';
import React from 'react';
import { useTheme } from 'styled-components';

const Navbar: React.FC = () => {
  const { navbarHeight } = useTheme();
  return (
    <Header sx={{ height: navbarHeight }}>
      <Header.Item>
        <Link href="/">
          <StyledOcticon
            icon={() => (
              <div>
                <LogoIcon />
              </div>
            )}
            size={32}
            mr={2}
          />
        </Link>
      </Header.Item>
    </Header>
  );
};

export default Navbar;
