import theme, { colors } from '@lib/theme';
import { GridState } from 'css-grid-template-parser';
import { AnimateSharedLayout } from 'framer-motion';
import React, { FC, memo } from 'react';
import { useMedia } from 'react-use';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import CodeSection from './CodeSection';
import GridActions, { OptionsState, optionsState } from './GridActions';
import { gridHistoryState, gridState } from './gridState';
import { GridAreas } from './GridValues';
import Sidebar from './Sidebar';

const GridEditor: FC<{ data: GridState }> = ({ data }) => {
  const [grid, setGridState] = useRecoilState(gridState);
  const [gridHistory, setGridHistory] = useRecoilState(gridHistoryState);
  const { showCode, showSidebar } = useRecoilValue(optionsState);
  const isMobile = useMedia('(min-width: 480px)');
  if (!grid) setGridState(data);
  if (!gridHistory) setGridHistory([data]);

  return (
    <GridEditorStyles showCode={showCode}>
      <AnimateSharedLayout>
        {showSidebar && <Sidebar isMobile={isMobile} className="Sidebar" />}
        <GridAreas className="GridAreas" />
        <GridActions className="GridActions" />
        {showCode && <CodeSection className="code" />}
      </AnimateSharedLayout>
    </GridEditorStyles>
  );
};
const GridEditorStyles = styled.div<Pick<OptionsState, 'showCode'>>`
  display: grid;
  grid-template:
    'sidebar areas code' 1fr
    'sidebar areas code' 1fr
    'actions actions actions' ${theme.navbarHeight} / auto 1fr auto;
  height: 100%;
  max-height: ${({ theme: { navbarHeight } }) =>
    `calc(100vh - ${navbarHeight})`};
  overflow: hidden;

  .Sidebar {
    grid-area: sidebar;
    background: ${colors.base};
    border: 4px solid ${colors.baseShade};
    box-shadow: ${colors.boxShadow};
  }

  .GridActions {
    grid-area: actions;
  }

  .GridAreas {
    grid-area: areas;
    overflow: hidden;
  }
  .code {
    grid-area: code;
    background: ${colors.base};
  }
`;

GridEditor.displayName = 'GridEditor';
export default memo(GridEditor);
