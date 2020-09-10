import styled from 'styled-components/macro';
import { Input, Label } from '@rebass/forms/styled-components';
import React from 'react';
import { GridArea } from '../../store/grid';
import { useGridEditorUi } from '../../store/ui';

const GridEditorItem: React.FC<GridArea> = ({ id, name }) => {
  const [isEditable, setIsEditable] = React.useState(false);

  const { handleClick, activeEditingId } = useGridEditorUi();

  return (
    <StandardGridEditorItemWrapper id={id} onClick={handleClick}>
      {activeEditingId}
    </StandardGridEditorItemWrapper>
  );
};

const StyledGridEditorItem = styled.div`
  padding: var(--space-2);
  background-color: var(--color-primary);
  border-radius: var(--space-2);
`;

const StandardGridEditorItemWrapper = styled(StyledGridEditorItem)`
  ::before {
    width: min-content;
    height: min-content;
    padding-top: var(--space-1);
    padding-right: var(--space-3);
    padding-bottom: var(--space-1);
    padding-left: var(--space-3);
    font-weight: bold;
    text-align: center;
    background-color: var(--color-background);
    border-radius: var(--space-1);
  }
`;

export default GridEditorItem;
