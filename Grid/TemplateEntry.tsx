import { Absolute, BorderBoxProps } from '@primer/components';
import { transparentize } from 'polished';
import React, { FC, memo, useMemo } from 'react';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { randomColor } from '../lib/random';
import { diffAreaString, newAreaState } from './CreatingArea';
import { shouldHighlight } from './gridAreasState';
import { selectedControlState } from './gridState';

type TemplateEntryProps = {
  row: number;
  column: number;
  index: number;
  gridArea: string;
};

export const templateState = atom({
  key: 'template',
  default: { dragging: false },
});

const TemplateEntry: FC<TemplateEntryProps> = ({
  row,
  column,
  index,
  gridArea,
}) => {
  const [state, setState] = useRecoilState(templateState);
  const propertyIds = useRecoilValue(selectedControlState);

  const highlight = useMemo(() => shouldHighlight(row, column, propertyIds), [
    column,
    propertyIds,
    row,
  ]);

  const [newArea, setNewArea] = useRecoilState(newAreaState);

  const down = () => {
    setState({ dragging: true });
    setNewArea({
      editing: true,
      dragging: true,
      gridArea: diffAreaString(gridArea, gridArea),
      bg: transparentize(0.25, randomColor()),
    });
  };
  const enter = () => {
    // if (!newArea) return;
    if (state.dragging)
      setNewArea((prev) => ({
        ...prev,
        gridArea: diffAreaString(prev.gridArea, gridArea),
      }));
  };
  const up = (): void => {
    if (state.dragging) {
      setNewArea((prev) => ({
        ...prev,
        gridArea: diffAreaString(prev.gridArea, gridArea),
        dragging: false,
      }));
    }
    setState((prev) => ({ dragging: false }));
  };
  return (
    <TemplateEntryStyled
      index={index}
      highlight={highlight}
      gridArea={gridArea}
      onPointerDown={down}
      onPointerEnter={enter}
      onPointerUp={up}
      dragging={state.dragging}
    >
      <Absolute position="absolute" bottom={0} right="50%">
        <span>{row}</span>
      </Absolute>
      <Absolute position="absolute" bottom="50%" right={0}>
        <span>{column}</span>
      </Absolute>
    </TemplateEntryStyled>
  );
};
export default memo(TemplateEntry);

type TemplateEntryStyledProps = BorderBoxProps & {
  index: number;
  gridArea: string;
  dragging: boolean;
  selection?: [start: string, end?: string];
  highlight: ReturnType<typeof shouldHighlight>;
};

const TemplateEntryStyled = styled.div<TemplateEntryStyledProps>(
  ({ dragging, highlight, gridArea, theme: { colors } }) => ({
    // pointerEvents: dragging ? 'none' : 'auto',
    userSelect: 'none',
    position: 'relative',
    display: 'flex',
    zIndex: highlight !== null ? 100 : dragging ? 100 : 1,
    justifyContent: 'space-between',
    gridArea: gridArea as string,
    borderWidth: '2px',
    borderStyle: dragging ? 'dotted' : 'dashed',
    borderColor: 'black',
    backgroundColor:
      highlight !== null
        ? highlight === 'rows'
          ? colors.purple[1]
          : colors.yellow[2]
        : 'transparent',
  })
);
