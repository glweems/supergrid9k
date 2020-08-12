import Div100vh from "react-div-100vh";
import styled from "styled-components";
import { Control } from "./Control";

const Layout = styled(Div100vh)`
  display: grid;
  grid-template-areas:
    "grid-sidebar grid-entries"
    "grid-sidebar code-viewer";
  grid-template-rows: 1fr 30%;
  grid-template-columns: 300px 1fr;
  width: 100vw;
  overflow: hidden;

  .grid-sidebar {
    grid-area: grid-sidebar;
    color: ${({ theme }) => theme.colors.text};
    border-right: 2px solid ${({ theme }) => theme.colors.light};
  }

  .grid-entries {
    grid-area: grid-entries;
  }

  .code-viewer {
    grid-area: code-viewer;
  }

  aside {
    padding-right: ${({ theme }) => theme.space[3]}px;
    padding-bottom: ${({ theme }) => theme.space[4]}px;
    padding-left: ${({ theme }) => theme.space[3]}px;
  }
`;

export default Layout;
