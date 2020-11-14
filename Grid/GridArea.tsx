import { Absolute, Button, ButtonGroup } from '@primer/components';
import React, { FC, memo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import gridAreaStr from '../css-grid-template-parser/gridAreaStr';
import { areaState } from './gridAreasState';

export const GridArea: FC<{ name: string }> = ({ name: initialName }) => {
  const area = useRecoilValue(areaState(initialName));
  const setArea = useSetRecoilState(areaState(initialName));

  const handleDelete = () => {
    setArea(null);
  };
  const initialBg = area?.bg ?? 'blue.5';

  const gridArea = gridAreaStr(area);
  const [state, setState] = useState({
    editing: false,
    name: initialName,
    bg: area.bg,
  });
  const handleChange = (e) =>
    setState((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  return (
    <NamedAreaDiv bg={state.bg} gridArea={gridArea}>
      <AreaNameInput value={state.name} onChange={handleChange} />

      <Absolute top={2} right={2}>
        {!state.editing ? (
          <Button
            onClick={() => setState((prev) => ({ ...prev, editing: true }))}
          >
            edit
          </Button>
        ) : (
          <ButtonGroup>
            <Button>Save</Button>
            <Button
              onClick={() =>
                setState({ editing: false, name: initialName, bg: initialBg })
              }
            >
              Cancel
            </Button>
            <Button onClick={handleDelete}>Delete</Button>
          </ButtonGroup>
        )}
      </Absolute>
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
  /* z-index: 12; */
  /* z-index: ${(props) => (props.isEditing ? 1000 : 1)}; */
  display: flex;
  grid-area: ${(props) => props.gridArea};
  place-content: center;
  align-items: center;
  background-color: ${({ bg }) => bg};
  button {
    z-index: 1000;
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
AreaNameInput.defaultProps = {
  // variant: 'small',
};

GridArea.displayName = 'GridArea';
export default memo(GridArea);