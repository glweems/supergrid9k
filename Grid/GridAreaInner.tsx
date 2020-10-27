import { TextInput } from '@primer/components';
import React, { FC, useState } from 'react';
import { atom, useRecoilValue } from 'recoil';
import { GridAreaObject, selectedAreaState } from './GridAreas';

export const editingAreaState = atom({ key: 'editingArea', default: null });

type GridAreaInnerProps = Pick<GridAreaObject, 'index'>;
export const GridAreaInner: FC<GridAreaInnerProps> = ({ index }) => {
  const { row, column, gridArea } = useRecoilValue(selectedAreaState(index));
  console.log('gridArea: ', gridArea);
  const [isEditing, setIsEditing] = useState(() => gridArea === 'temp');

  if (gridArea === 'temp')
    return (
      <div>
        <TextInput />
      </div>
    );
  return <div>hello</div>;
};
