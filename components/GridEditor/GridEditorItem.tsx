import { GearIcon } from '@/lib/Icons';
import { GridArea } from '@/store/grid';
import { useGridEditorUi } from '@/store/ui';
import Button from '@/ui/Button';
import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components/macro';

const GridEditorItem: React.FC<GridArea> = ({ id, gridTemplateArea }) => {
  const { handleClick } = useGridEditorUi();
  function onPan(_event, info) {
    console.log(info);
  }

  return (
    <StandardGridEditorItemWrapper
      layoutId={id}
      drag
      onPan={onPan}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {gridTemplateArea}
      <Button
        as={motion.button}
        id={id}
        onClick={handleClick}
        bg="background"
        color="muted"
      >
        <GearIcon size={25} />
      </Button>
    </StandardGridEditorItemWrapper>
  );
};

const StyledGridEditorItem = motion.custom(styled.div`
  padding: var(--space-2);
  background-color: var(--color-primary);
  border-radius: var(--space-2);
`);

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
