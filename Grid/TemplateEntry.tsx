import { Absolute, BorderBoxProps } from '@primer/components';
import { transparentize } from 'polished';
import React, { FC, memo, useMemo } from 'react';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { randomColor } from '../lib/random';
import { newAreaState } from './CreatingArea';
import diffAreaString from './diffAreaString';
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
  default: { dragging: false, editing: false },
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
    setState({ dragging: true, editing: true });
    setNewArea({
      dragging: true,
      gridArea,
      bg: transparentize(0.25, randomColor()),
    });
  };
  const enter = () => {
    // if (!newArea) return;
    if (newArea && state.dragging && state.editing)
      setNewArea((prev) => ({
        ...prev,
        gridArea: diffAreaString(prev.gridArea, gridArea),
      }));
  };

  const up = (): void => {
    setNewArea((prev) => ({
      ...prev,
      gridArea: diffAreaString(prev.gridArea, gridArea),
      dragging: false,
      editing: false,
    }));
    setState((prev) => ({ ...prev, dragging: false, editing: false }));
  };
  return (
    <TemplateEntryStyled
      index={index}
      highlight={highlight}
      gridArea={gridArea}
      onPointerDown={down}
      onPointerEnter={enter}
      onPointerUp={up}
      {...state}
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
  editing: boolean;
  selection?: [start: string, end?: string];
  highlight: ReturnType<typeof shouldHighlight>;
};

const TemplateEntryStyled = styled.div<TemplateEntryStyledProps>(
  ({ dragging, editing, highlight, gridArea, theme: { colors } }) => ({
    userSelect: 'none',
    position: 'relative',
    display: 'flex',
    zIndex: dragging ? 100 : editing ? 100 : 1,
    justifyContent: 'space-between',
    gridArea: gridArea as string,
    borderWidth: '2px',
    borderStyle: dragging ? 'dotted' : 'dashed',
    borderColor: transparentize(0.75, colors.bg.disabled),
    backgroundColor:
      highlight !== null
        ? highlight === 'rows'
          ? transparentize(0.75, colors.purple[5])
          : transparentize(0.75, colors.yellow[5])
        : 'transparent',
  })
);
