import styled from "styled-components/macro";
import theme from "../lib/theme";

const Layout = styled.main`
  position: absolute;
  display: grid;
  grid-template-areas: "grid-sidebar grid-entries code-viewer";
  grid-template-rows: 100vh;
  grid-template-columns: 275px 1fr auto;
  width: 100vw;
  max-width: 100vw;

  .grid-sidebar {
    position: sticky;
    top: 1rem;
    right: 1rem;
    grid-area: grid-sidebar;
    height: 100vh;
    max-height: 100vh;
    padding: var(--space-3);
    overflow-y: auto;
    color: var(--color-text);
  }

  .grid-entries {
    grid-area: grid-entries;
  }

  .code-viewer {
    position: relative;
    top: 0;
    right: 0;
    grid-area: code-viewer;
    width: 300px;
    max-height: 100vh;
    padding: var(--space-3);
    overflow-y: auto;
    color: var(--color-text);

    .CodePenButton {
      position: absolute;
      right: var(--space-2);
      bottom: var(--space-3);
      width: calc(100% - var(--space-3));
      margin: auto;
      background-color: var(--color-background);
    }
    pre {
      height: fit-content;
      font-size: 14px;
    }
  }
`;

Layout.displayName = "Layout";
Layout.defaultProps = { theme };
export default Layout;
