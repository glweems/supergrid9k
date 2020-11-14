import { Absolute, Button, ButtonGroup } from '@primer/components';
import { camelCase } from 'lodash';
import React, { FC, memo, useEffect, useRef, useState } from 'react';
import {
  atom,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import gridAreaStrToObj from '../css-grid-template-parser/gridAreaStringToObj';
import { AreaNameInput, NamedAreaDiv } from './GridArea';
import { gridState } from './gridState';

const CreatingArea: FC = () => {
  const inputReference = useRef<HTMLInputElement>(null);

  const newArea = useRecoilValue(newAreaState);
  console.log('newArea: ', newArea);
  const reset = useResetRecoilState(newAreaState);
  const setGrid = useSetRecoilState(gridState);
  const [name, setName] = useState('');

  useEffect(() => {
    if (!newArea.dragging) (inputReference?.current as any)?.focus();
  }, [newArea.dragging]);

  const handleSave = (): void => {
    setGrid((prev) => ({
      ...prev,
      areas: {
        ...prev.areas,
        [camelCase(name)]: {
          ...gridAreaStrToObj(newArea.gridArea),
          bg: newArea.bg,
        },
      },
    }));
    reset();
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };
  return (
    <NamedAreaDiv
      gridArea={newArea.gridArea}
      bg={newArea.bg}
      isEditing={newArea.editing}
    >
      <AreaNameInput
        ref={inputReference}
        autoFocus={true}
        placeholder="Name"
        name="name"
        value={name}
        onChange={handleChange}
      />
      <Absolute top={2} right={2}>
        <ButtonGroup>
          <Button onClick={handleSave} disabled={!name}>
            Save
          </Button>
          <Button onClick={reset}>Discard</Button>
        </ButtonGroup>
      </Absolute>
    </NamedAreaDiv>
  );
};

CreatingArea.displayName = 'CreatingArea';

export default memo(CreatingArea);

type NewArea = {
  gridArea: string;
  editing?: boolean;
  bg?: string;
  name?: string;
  dragging: boolean;
};

export const newAreaState = atom<NewArea>({
  key: 'newArea',
  default: null,
});

export function diffAreaString(start: string, end?: string) {
  if (typeof end === 'undefined') return start;
  const [prs, pcs, pre, pce] = start?.split(' / ');
  const [crs, ccs, cre, cce] = end.split(' / ');

  return [
    prs <= crs ? prs : crs,
    pcs <= ccs ? pcs : ccs,
    pre >= cre ? pre : cre,
    pce >= cce ? pce : cce,
  ].join(' / ');
}
