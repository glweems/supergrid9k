import { Button, ButtonOutline, TextInput } from '@primer/components';
import omit from 'lodash/omit';
import React, { FC, useState } from 'react';
import {
  atom,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { Area } from '../css-grid-template-parser/types';
import {
  currentEditingAreaNameState,
  GridAreaObject,
  selectedAreaState,
  selectedElementIdsState,
} from './GridAreas';
import { gridState } from './gridState';

const areaState = selectorFamily<string, string>({
  key: 'area',
  get: (name) => ({ get }) => {
    const grid = get(gridState);
    return grid.areas[name];
  },
  set: (name) => ({ get, set }, newName: string) => {
    return set(gridState, (prev) => ({
      ...prev,
      areas: { ...omit(prev.areas, name), [newName]: prev.areas[name] },
    }));
  },
});

type GridAreaInnerProps = Pick<GridAreaObject, 'index' | 'gridArea'>;

export const GridAreaInner: FC<GridAreaInnerProps> = ({ index }) => {
  const [editName, setEditName] = useRecoilState(currentEditingAreaNameState);
  const { row, column, gridArea } = useRecoilValue(selectedAreaState(index));
  const [grid, setGrid] = useRecoilState(gridState);
  const setSelectedIds = useSetRecoilState(selectedElementIdsState);
  const [name, setName] = useState(() => (editName === 'temp' ? '' : gridArea));
  const cancelAreaEditing = (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    setGrid((prev) => ({ ...prev, areas: omit(prev.areas, 'temp') }));
    setEditName(null);
  };
  if (editName === gridArea)
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
  return <div>hello</div>;
};
