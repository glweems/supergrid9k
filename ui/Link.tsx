import NextLink from 'next/link';
import React from 'react';
import { Link as RBLink, LinkProps } from 'rebass/styled-components';

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, ...props }, ref) => (
    <RBLink as={NextLink} ref={ref} {...props}>
      {children}
    </RBLink>
  )
);

Link.displayName = 'Link';
export default Link;
