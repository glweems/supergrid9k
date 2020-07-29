import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { boxComposition, BoxProps } from "../ui/Box";

const Navbar: React.FC = ({ children }) => (
  <Header
    bg="dark"
    color="light"
    paddingY={1}
    paddingX={3}
    display="flex"
    justifyContent="space-between"
  >
    <nav>
      <Link to="/">Super Grid 9k</Link>
      <Link to="/about">About</Link>
    </nav>
  </Header>
);

const Header = styled.header<BoxProps>`
  ${boxComposition}

  nav {
    display: flex;
    flex-direction: column;
  }

  a {
    margin-right: ${({ theme }) => theme.space[3]}px;
    color: ${({ theme }) => theme.colors.light};
  }
`;

export default Navbar;
