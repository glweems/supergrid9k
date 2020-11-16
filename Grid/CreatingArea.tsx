import { motion } from 'framer-motion';
import { camelCase } from 'lodash';
import React, { FC, useCallback, useRef, useState } from 'react';
import {
  atom,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import gridAreaStrToObj from '../css-grid-template-parser/gridAreaStringToObj';
import { AreaNameInput, NamedAreaDiv } from './GridArea';
import { gridState } from './gridState';
import { templateState } from './TemplateEntry';
const CreatingArea: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const newArea = useRecoilValue(newAreaState);

  const reset = useResetRecoilState(newAreaState);
  const setGrid = useSetRecoilState(gridState);
  const [name, setName] = useState('');
  const temp = useResetRecoilState(templateState);

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
    temp();
  };

  const handleChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  return (
    <CreatingAreaDiv
      gridArea={newArea?.gridArea}
      bg={newArea?.bg}
      isEditing={newArea?.editing}
    >
      <AreaNameInput
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSave();
          if (e.key === 'Escape') {
            reset();
            temp();
          }
        }}
        placeholder="Name"
        name="name"
        value={name}
        onChange={handleChange}
      />
    </CreatingAreaDiv>
  );
}; /* <Absolute top={2} right={2}>
        <ButtonGroup>
          <Button onClick={handleSave} disabled={!name}>
            Save
          </Button>
          <Button onClick={reset}>Discard</Button>
        </ButtonGroup>
      </Absolute> */

const CreatingAreaDiv = motion.custom(NamedAreaDiv);

CreatingArea.displayName = 'CreatingArea';

export default CreatingArea;

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
