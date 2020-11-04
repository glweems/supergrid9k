import {
  Button,
  ButtonGroup,
  ButtonOutline,
  TextInput,
} from '@primer/components';
import BorderBox from '@primer/components/lib/BorderBox';
import Grid from '@primer/components/lib/Grid';
import { camelCase } from 'lodash';
import dynamic from 'next/dynamic';
import React, { FC, Fragment, useRef, useState } from 'react';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import styled from 'styled-components';
import {
  areaState,
  gridAreasArrayState,
  gridEntriesState,
  selectedAreasState,
} from './gridAreasState';
import { gridCssState } from './gridCssState';
import { gridState } from './gridState';
import { TemplateEntry } from './TemplateEntry';

export const GridAreas: FC = () => {
  const constraintsRef = useRef(null);
  const gridCss = useRecoilValue(gridCssState);

  const areas = useRecoilValue(gridAreasArrayState);
  const entries = useRecoilValue(gridEntriesState);

  const [grid] = useRecoilState(gridState);
  return (
    <Grid ref={constraintsRef} style={gridCss}>
      {entries?.map(([row, column, gridArea], index) => {
        return (
          <TemplateEntry
            key={`[${row}].${column}`}
            row={row}
            column={column}
            index={index}
            gridArea={gridArea}
          />
        );
      })}
      {areas?.map((area, index) => (
        <GridArea key={`[${area}].${index}`} name={area} />
      ))}
    </Grid>
  );
};

const GridArea: FC<{ name: string }> = ({ name: initialName }) => {
  const area = useRecoilValue(areaState(initialName));
  const setArea = useSetRecoilState(areaState(initialName));
  const resetArea = useResetRecoilState(areaState(initialName));
  const [name, setName] = useState(initialName);
  const [grid, setGrid] = useRecoilState(gridState);
  const [selectedArea, setSelectedArea] = useRecoilState(selectedAreasState);
  const handleCancel = () => setSelectedArea(null);
  const handleDelete = () => {
    setSelectedArea(null);
    setArea(null);
  };
  const isEditing = initialName === selectedArea;
  const handleSave = () => {
    setArea({ ...area, name: camelCase(name) });
    setSelectedArea(null);
  };
  return (
    <BorderBox
      style={{
        gridArea: [
          area.row.start,
          area.column.start,
          area.row.end,
          area.column.end,
        ].join(' / '),
        position: 'relative',
        zIndex: 100,
        display: 'flex',
        placeContent: 'center',
        placeItems: 'center',
      }}
      bg={area?.bg ?? 'blue.5'}
    >
      <AreaNameInput
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        disabled={!isEditing}
        autoComplete="off"
      />

      <ButtonGroup sx={{ position: 'absolute', top: '1rem', right: '1rem' }}>
        {isEditing ? (
          <Fragment>
            <ButtonOutline
              variant="small"
              onClick={handleSave}
              sx={{ color: 'green.5', ':hover': { bg: 'green.5' } }}
            >
              save
            </ButtonOutline>
            <ButtonOutline onClick={handleCancel} variant="small">
              cancel
            </ButtonOutline>
            <ButtonOutline
              onClick={handleDelete}
              variant="small"
              sx={{ color: 'red.5', ':hover': { bg: 'red.5' } }}
            >
              delete
            </ButtonOutline>
          </Fragment>
        ) : (
          <Button
            variant="small"
            onClick={() => {
              if (!isEditing) setSelectedArea(initialName);
            }}
          >
            edit
          </Button>
        )}
      </ButtonGroup>
    </BorderBox>
  );
};

const AreaNameInput = styled(TextInput)`
  z-index: 3000;
  color: ${(props) =>
    props.disabled
      ? props.theme.colors.accent.blue
      : props.theme.colors.text.grayDark};
  font-weight: bold;
  text-align: center;
  background: ${(props) =>
    props.disabled ? 'transparent' : props.theme.colors.bg.grayLight};
  ${(props) => props && props.disabled && `border: none;box-shadow: none;`};
`;
AreaNameInput.defaultProps = {
  variant: 'small',
};
GridAreas.displayName = 'GridAreas';
