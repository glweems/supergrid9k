import styled from 'styled-components/macro';
import theme from '@/lib/theme';
import { LayoutProps, layout } from 'styled-system';

const GridEditorLayout = styled.main<LayoutProps>`
  ${layout};
  position: absolute;
  display: grid;
  grid-template-areas:
    'grid-sidebar grid-entries code-viewer'
    'grid-sidebar dirty-controls code-viewer';
  grid-template-rows: 1fr auto;
  grid-template-columns: 275px 1fr auto;
  width: 100vw;
  max-width: 100vw;
  overflow-y: hidden;

  /* Input */
  @supports selector(:) {
    button:focus {
      outline: none;
    }
  }

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

    .CodePenButton,
    .SaveTemplateButton {
      width: calc(100% - var(--space-3));
    }

    .SaveTemplateButton {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
      margin: auto;
      color: var(--color-text);
      background-color: var(--color-primary);
    }
    pre {
      height: fit-content;
      font-size: 14px;
    }
  }
`;

GridEditorLayout.displayName = 'GridEditorLayout';
GridEditorLayout.defaultProps = { theme };
export default GridEditorLayout;
