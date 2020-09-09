import styled from 'styled-components/macro';
import { Input, Label } from '@rebass/forms/styled-components';
import React from 'react';

interface GridEditorItemProps {
  name: string | number;
}

const GridEditorItem: React.FC<GridEditorItemProps> = ({ name }) => {
  const [isEditable, setIsEditable] = React.useState(false);

  if (isEditable)
    return (
      <StyledGridEditorItem>
        <div className="item-control">
          <Label>
            Area Name
            <Input bg="primary" />
          </Label>
        </div>
      </StyledGridEditorItem>
    );

  return <StandardGridEditorItemWrapper name={name} onClick={(e) => setIsEditable((state) => !state)} />;
};

const StyledGridEditorItem = styled.div`
  padding: var(--space-2);
  background-color: var(--color-primary);
  border-radius: var(--space-2);
`;

const StandardGridEditorItemWrapper = styled(StyledGridEditorItem)<GridEditorItemProps>`
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
    content: '${({ name }) => name}';
  }
`;

export default GridEditorItem;
