import styled from "styled-components/macro";

const Layout = styled.main`
  position: relative;
  display: grid;
  grid-template-areas:
    "grid-sidebar grid-entries"
    "grid-sidebar code-viewer";
  grid-template-rows: 1fr 250px;
  grid-template-columns: 300px 1fr;
  width: 100vw;
  max-width: 100vw;

  .grid-sidebar {
    position: sticky;
    top: 1rem;
    right: 1rem;
    grid-area: grid-sidebar;
    height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
    color: ${({ theme }) => theme.colors.text};
  }

  .grid-entries {
    grid-area: grid-entries;
  }

  .code-viewer {
    grid-area: code-viewer;
  }
`;

export default Layout;
