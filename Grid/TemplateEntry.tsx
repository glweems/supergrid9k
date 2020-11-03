import { BorderBoxProps } from '@primer/components';
import BorderBox from '@primer/components/lib/BorderBox';
import { track } from 'css-grid-template-parser';
import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import styled from 'styled-components';
import CodeBlock from '../components/CodeBlock';
import {
  areaState,
  entryState,
  selectedAreaNameState,
  selectedAreasState,
  shouldHighlight,
} from './gridAreasState';
import gridAreaStr from '../css-grid-template-parser/gridAreaStr';
import { gridState, selectedControlState } from './gridState';
import gridAreaStrToObj from '../css-grid-template-parser/gridAreaStringToObj';
import { GridAreaStr } from './typedString';

const dragStatusState = atom({ key: 'dragStatus', default: null });
const selectedIndexState = atom<number>({
  key: 'selectedAreaIndex',
  default: null,
});

export const TemplateEntry = ({ row: rowNum, column: columnNum, index }) => {
  const row = useMemo(() => track(rowNum, rowNum + 1), [rowNum]);
  const column = useMemo(() => track(columnNum, columnNum + 1), [columnNum]);
  const [state, setState] = useRecoilState(entryState([rowNum, columnNum]));

  const [selectedIndex, setSelectedIndex] = useRecoilState(selectedIndexState);
  const propertyIds = useRecoilValue(selectedControlState);
  const [selectedAreaName, setSelectedAreaName] = useRecoilState(
    selectedAreaNameState
  );
  const [selectedArea, setSelectedArea] = useRecoilState(selectedAreasState);
  const setArea = useSetRecoilState(areaState(selectedAreaName));

  const highlight = useMemo(
    () => shouldHighlight(rowNum, columnNum, propertyIds),
    [columnNum, propertyIds, rowNum]
  );
  const gridArea = useMemo(() => gridAreaStr({ row, column }), [column, row]);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useRecoilState(dragStatusState);

  useEffect(() => {
    if (highlight && !selectedArea)
      setState((prev) => ({ ...prev, bg: 'purple.1' }));
    else
      setState((prev) => ({
        ...prev,
        bg: selectedArea ? 'transparent' : 'gray.1',
      }));
  }, [row, propertyIds, setState, state.bg, highlight, selectedArea]);

  return (
    <TemplateEntryStyled
      index={index}
      status={status}
      highlight={highlight}
      gridArea={gridArea}
      selectedIndex={selectedIndex}
      selectedArea={selectedAreaName}
      onMouseDown={() => {
        if (status === '') {
          setSelectedArea((prev) => [gridArea]);
          setStatus('dragging');
          setSelectedAreaName(gridArea);
          setSelectedIndex(index);
        }
      }}
      onMouseEnter={() => {
        if (selectedArea)
          switch (status) {
            case 'dragging':
              setSelectedArea(([start]) => [start, gridArea]);

              setSelectedAreaName(gridArea);
              break;

            default:
              break;
          }
      }}
      onMouseUp={() => {
        setDragging(false);
        setStatus('');
        setSelectedAreaName(null);
        setSelectedIndex(null);
      }}

      // onClick={handleClick}
    ></TemplateEntryStyled>
  );
};
type TemplateEntryStyledProps = BorderBoxProps & {
  index: number;
  status: string;
  gridArea: GridAreaStr;
  selectedIndex: number;
  selectedArea: [start: GridAreaStr, end?: GridAreaStr];
  highlight: ReturnType<typeof shouldHighlight>;
};
const TemplateEntryStyled = styled<FC<TemplateEntryStyledProps>>(BorderBox)(
  ({
    index,
    status,
    highlight,
    gridArea,
    selectedArea,
    selectedIndex,
    theme: { colors },
  }) => ({
    userSelect: 'none',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    gridArea:
      selectedIndex === index
        ? diffAreaString(gridArea, selectedArea)
        : (gridArea as string),
    backgroundColor:
      highlight !== null
        ? highlight === 'rows'
          ? colors.purple[2]
          : colors.yellow[2]
        : selectedIndex === index
        ? colors.blue[3]
        : 'transparent',
  })
);

function diffAreaString(prev: GridAreaStr, current: GridAreaStr) {
  const [prs, pcs, pre, pce] = prev?.split(' / ');
  /* ------0     1    2  */
  const [crs, ccs, cre, cce] = current?.split(' / ');

  if (crs >= prs && pcs >= ccs) return [crs, ccs, pre, pce].join(' / ');

  return [prs, pcs, cre, cce].join(' / ');
}
