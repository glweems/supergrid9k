import { Absolute, Button, ButtonGroup } from '@primer/components';
import { camelCase } from 'lodash';
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  atom,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import styled from 'styled-components';
import gridAreaStrToObj from '../css-grid-template-parser/gridAreaStringToObj';
import { AreaNameInput, NamedAreaDiv } from './GridArea';
import { gridState } from './gridState';
import { templateState } from './TemplateEntry';
const CreatingArea: FC = () => {
  const inputReference = useRef<HTMLInputElement>(null);

  const newArea = useRecoilValue(newAreaState);

  const reset = useResetRecoilState(newAreaState);
  const setGrid = useSetRecoilState(gridState);
  const [name, setName] = useState('');
  const temp = useRecoilValue(templateState);

  useEffect(() => {
    if (!temp.dragging) (inputReference?.current as any)?.focus();
  }, [newArea.dragging, temp.dragging]);

  const handleSave = useCallback((): void => {
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
  }, [name, newArea.bg, newArea.gridArea, reset, setGrid]);

  const handleChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  return (
    <CreatingAreaDiv
      gridArea={newArea.gridArea}
      bg={newArea.bg}
      isEditing={newArea.editing}
    >
      <AreaNameInput
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSave();
          if (e.key === 'Escape') reset();
        }}
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
    </CreatingAreaDiv>
  );
};

const CreatingAreaDiv = styled(NamedAreaDiv)``;

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
