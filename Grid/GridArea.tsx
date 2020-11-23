import { camelCase, omit } from 'lodash';
import React, { FC, memo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import gridAreaStr from '../css-grid-template-parser/gridAreaStr';
import { areaState } from './gridAreasState';
import { gridState } from './gridState';

export const GridArea: FC<{ name: string }> = ({ name: initialName }) => {
  const setGrid = useSetRecoilState(gridState);
  const area = useRecoilValue(areaState(initialName));
  const setArea = useSetRecoilState(areaState(initialName));
  const [name, setName] = useState(() =>
    initialName === 'temp' ? '' : initialName
  );
  const bg = area?.bg ?? 'blue.5';

  // const func = useDebounce(handleChange);
  const handleDelete = () => {
    setArea(null);
  };

  const gridArea = gridAreaStr(area);

  const handleSave = () => {
    return setGrid((prev) => ({
      ...prev,
      areas: { ...omit(prev.areas, initialName), [name]: { ...area, bg } },
    }));
  };

  const handleChange = (e) => setName(camelCase(e.currentTarget.value));
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleDelete();
  };

  return (
    <NamedAreaDiv bg={bg} gridArea={gridArea}>
      <AreaNameInput
        value={name}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="name"
      />
    </NamedAreaDiv>
  );
};
type NamedAreaDivProps = {
  gridArea: string;
  isEditing?: boolean;
  bg: string;
};

export const NamedAreaDiv = styled.div<NamedAreaDivProps>`
  position: relative;
  display: flex;
  grid-area: ${(props) => props.gridArea};
  place-content: center;
  align-items: center;
  background-color: ${({ bg }) => bg};
  button {
    z-index: 1000;
  }
  :focus {
    outline: 4px dashed ${({ theme }) => theme.colors.focus};
    outline-offset: -4px;
  }
`;

export const AreaNameInput = styled.input`
  z-index: 3000;
  width: 100%;
  padding: 1rem;
  color: ${(props) => props.theme.colors.text.grayDark};
  font-weight: bold;
  font-size: 4.5vw;
  text-align: center;
  text-transform: uppercase;
  -webkit-line-clamp: 3;
  background-color: transparent;
  border: none;
  outline: none;
  :focus {
    outline: 4px dashed ${({ theme }) => theme.colors.focus};
    outline-offset: -4px;
  }
`;

GridArea.displayName = 'GridArea';
export default memo(GridArea);
