import React from 'react';
import { Button } from 'rebass/styled-components';
import { Icon, iconButtonCss } from '../../lib/Icons';
import { useResetGrid } from '../../state';

interface GridEditorResetButtonProps {}

const GridEditorResetButton: React.FC<GridEditorResetButtonProps> = ({ children }) => {
  const resetGrid = useResetGrid();
  return (
    <Button onClick={resetGrid} variant="reset" css={iconButtonCss as any}>
      <Icon size={24} color="code">
        <path
          fillRule="evenodd"
          d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
        />
      </Icon>
      {children}
    </Button>
  );
};

GridEditorResetButton.defaultProps = { children: <div>Reset Grid</div> };

export default GridEditorResetButton;
