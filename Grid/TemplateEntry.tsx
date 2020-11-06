import { BorderBoxProps } from '@primer/components';
import BorderBox from '@primer/components/lib/BorderBox';
import React, { FC, useMemo, useState } from 'react';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import theme from '../lib/theme';
import {
  selectedAreaNameState,
  selectedAreasState,
  shouldHighlight,
} from './gridAreasState';
import { selectedControlState } from './gridState';
import { GridAreaStr } from './typedString';

const selectedIndexState = atom<number>({
  key: 'selectedAreaIndex',
  default: null,
});

export const TemplateEntry = ({ row, column, index, gridArea }) => {
  const [selectedIndex, setSelectedIndex] = useRecoilState(selectedIndexState);
  const propertyIds = useRecoilValue(selectedControlState);
  const [selectedAreaName, setSelectedAreaName] = useRecoilState(
    selectedAreaNameState
  );
  const [selection, setSelectedArea] = useRecoilState(selectedAreasState);
  const [dragging, setDragging] = useState(false);

  const highlight = useMemo(() => shouldHighlight(row, column, propertyIds), [
    column,
    propertyIds,
    row,
  ]);
  const gridAreaDisplayed = useMemo(
    () =>
      selectedIndex === index
        ? diffAreaString(gridArea, selectedAreaName)
        : gridArea,
    [gridArea, index, selectedAreaName, selectedIndex]
  );

  const handleDown = () => {
    if (!dragging) {
      setSelectedArea([gridArea]);
      setSelectedAreaName(gridArea);
      setSelectedIndex(index);
    }
  };
  const handleEnter = () => {
    if (selection && !dragging) {
      setSelectedArea(([start]) => [start, gridArea]);

      setSelectedAreaName(gridArea);
    }
  };
  const handleUp = () => {
    setDragging(false);
    setSelectedAreaName(null);
    setSelectedIndex(null);
  };
  return (
    <TemplateEntryStyled
      index={index}
      dragging={dragging}
      highlight={highlight}
      gridArea={gridAreaDisplayed}
      selectedIndex={selectedIndex}
      selectedAreaName={selectedAreaName}
      onMouseDown={handleDown}
      onMouseEnter={handleEnter}
      onMouseUp={handleUp}
    >
      {selection}
    </TemplateEntryStyled>
  );
};
type TemplateEntryStyledProps = BorderBoxProps & {
  index: number;
  dragging: boolean;
  gridArea: GridAreaStr;
  selectedIndex: number;
  selectedAreaName: GridAreaStr;
  selection?: [start: GridAreaStr, end?: GridAreaStr];
  highlight: ReturnType<typeof shouldHighlight>;
};

const draggingStyle = css({
  backgroundColor: theme.colors.red[3],
  borderColor: theme.colors.red[5],
});

const TemplateEntryStyled = styled<FC<TemplateEntryStyledProps>>(BorderBox)(
  ({
    index,
    highlight,
    dragging,
    gridArea,
    selectedIndex,
    theme: { colors },
  }) => ({
    userSelect: 'none',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    gridArea: gridArea as string,
    zIndex: index !== selectedIndex ? 1000 : 10,
    borderColor: 'black',
    backgroundColor:
      highlight !== null
        ? highlight === 'rows'
          ? colors.purple[2]
          : colors.yellow[2]
        : index === selectedIndex
        ? colors.blue[3]
        : 'transparent',
  })
);

function diffAreaString(prev: GridAreaStr, current: GridAreaStr) {
  const [prs, pcs, pre, pce] = prev?.split(' / ');
  /* ------0     1    2  */
  const [crs, ccs, cre, cce] = current?.split(' / ');

  return [
    prs <= crs ? prs : crs,
    pcs <= ccs ? pcs : ccs,
    pre >= cre ? pre : cre,
    pce >= cce ? pce : cce,
  ].join(' / ');
}