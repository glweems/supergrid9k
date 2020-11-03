import { Button, ButtonOutline, TextInput } from '@primer/components';
import omit from 'lodash/omit';
import React, { FC, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  currentEditingAreaNameState,
  GridAreaObject,
  selectedAreaState,
  selectedElementIdsState,
} from './GridAreas';
import { gridState } from './gridState';

type GridAreaInnerProps = Pick<GridAreaObject, 'index' | 'gridArea'>;

export const GridAreaInner: FC<GridAreaInnerProps> = ({ index, name: n }) => {
  const [editName, setEditName] = useRecoilState(currentEditingAreaNameState);
  const { row, column, gridArea } = useRecoilValue(selectedAreaState(index));

  const [grid, setGrid] = useRecoilState(gridState);
  const setSelectedIds = useSetRecoilState(selectedElementIdsState);
  const [name, setName] = useState(() => (editName === 'temp' ? '' : gridArea));
  const cancelAreaEditing = (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    setGrid((prev) => {
      const val = { ...prev, areas: omit(prev.areas, editName) };
      console.log('val: ', val);
      return val;
    });
    setEditName(null);
  };
  return (
    <div>
      <TextInput
        color="white"
        placeholder="Grid Area Name"
        value={name}
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
      />
      <Button
        onClick={(_e) => {
          setEditName(null);
          setGrid((prev) => ({
            ...prev,
            areas: {
              ...omit(prev.areas, editName),
              [name]: prev.areas[editName],
            },
          }));
        }}
      >
        save
      </Button>
      <ButtonOutline onClick={cancelAreaEditing}>cancel</ButtonOutline>
    </div>
  );
};
