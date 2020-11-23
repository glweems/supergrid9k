import { Absolute, BorderBoxProps } from '@primer/components';
import { transparentize } from 'polished';
import React, { FC, memo, useMemo } from 'react';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import gridAreaStrToObj from '../css-grid-template-parser/gridAreaStringToObj';
import { randomColor } from '../lib/random';
import diffAreaObjects from './diffAreaObjects';
import diffAreaString from './diffAreaString';
import { shouldHighlight } from './gridAreasState';
import { gridState, selectedControlState } from './gridState';

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
  const [grid, setGrid] = useRecoilState(gridState);
  const [state, setState] = useRecoilState(templateState);
  const propertyIds = useRecoilValue(selectedControlState);
  const newAreaObj = useMemo(() => gridAreaStrToObj(gridArea), [gridArea]);
  const highlight = useMemo(() => shouldHighlight(row, column, propertyIds), [
    column,
    propertyIds,
    row,
  ]);

  const down = () => {
    setState({ dragging: true, editing: true });

    setGrid((prev) => ({
      ...prev,
      areas: {
        ...prev.areas,
        temp: { ...newAreaObj, bg: transparentize(0.25, randomColor()) },
      },
    }));
  };

  const enter = () => {
    if (!state.dragging) return;
    if (grid.areas.temp)
      setGrid((prev) => ({
        ...prev,
        areas: {
          ...prev.areas,
          temp: { ...diffAreaObjects(prev.areas.temp, newAreaObj) },
        },
      }));
  };

  const up = (): void => {
    if (state.dragging && grid.areas.temp) {
      setGrid((prev) => ({
        ...prev,
        areas: {
          ...prev.areas,
          temp: {
            ...gridAreaStrToObj(
              diffAreaString(
                `${grid.areas.temp.row.start} / ${grid.areas.temp.column.start} / ${grid.areas.temp.row.end} / ${grid.areas.temp.column.end}`,
                gridArea
              )
            ),
            bg: transparentize(0.25, randomColor()),
          },
        },
      }));
      setState({ dragging: false, editing: false });
    }
  };
  return (
    <TemplateEntryStyled
      index={index}
      highlight={highlight}
      gridArea={gridArea}
      onPointerDown={down}
      onPointerOver={enter}
      onPointerUp={up}
      onTouchStart={down}
      onTouchMove={enter}
      onTouchEnd={up}
      onTouchStartCapture={enter}
      {...state}
    >
      <Absolute position="absolute" bottom={0} right="50%">
        <span>{row === grid.rows.length && row}</span>
      </Absolute>
      <Absolute position="absolute" bottom="50%" right={0}>
        <span>{column === grid.columns.length && column}</span>
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
          ? transparentize(0.5, colors.blue[5])
          : transparentize(0.75, colors.yellow[5])
        : 'transparent',
  })
);
