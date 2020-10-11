import { Button, ButtonGroup, FormGroup, TextInput } from '@primer/components';
import { track } from 'css-grid-template-parser';
import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';
import { variant } from 'styled-system';
import { GridItemProps } from './GridAreas';
import { GridState } from './GridState';

export function GridItem(area: GridItemProps) {
  const formik = useFormikContext<GridState>();
  const { selected } = formik.values;
  const [variant, setVariant] = useState<GridItemDivVariant>('default');
  const handleMouseEnter = () => {
    if (selected && variant === 'default') setVariant('target');
  };
  const handleMouseLeave = () => {
    if (variant === 'target') setVariant('default');
  };
  const handleClick = () => {
    if (!selected) {
      formik.setFieldValue('selected', area);
      variant !== 'selected' && setVariant('selected');
    }

    if (variant === 'selected' && selected) {
      if (formik.values.selected.gridArea === area.gridArea) {
        return () => {
          formik.setFieldValue('selected', null);
          setVariant('default');
        };
      }
    }

    if (variant === 'target') {
      const obj = {
        row: track(selected.row.start, area.row.end),
        column: track(selected.column.start, area.column.end),
      };
      formik.setFieldValue('areas.temp', obj);
      setVariant('default');
      formik.setFieldValue('selected', null);
    }

    // throttle(() => formik.setFieldValue(`areas.temp`, area), 200);
  };

  return (
    <GridItemDiv
      style={{ gridArea: area.gridArea }}
      variant={variant}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      // style={styleObj}
    >
      {area.gridArea}
    </GridItemDiv>
  );
}

const TempArea: React.FunctionComponent<any> = () => {
  const formik = useFormikContext<GridState>();
  const [name, setName] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setName(e.currentTarget.value);

  function handleCancel() {
    formik.setFieldValue('areas.temp', null);
  }
  function handleSave() {
    formik.setFieldValue(`areas.${name}`, {
      ...formik.values.areas.temp,
      name,
    });
    handleCancel();
  }
  return (
    <GridItemDiv variant="editing">
      <FormGroup color="white">
        <FormGroup.Label>Area Name</FormGroup.Label>
        <TextInput
          name="temp.name"
          placeholder="div"
          value={name}
          onChange={handleChange}
          color="text.grayLight"
          bg="bg.grayLight"
        />
        <ButtonGroup>
          <Button onClick={handleSave} variant="small">
            Save
          </Button>
          <Button onClick={handleCancel} variant="small">
            Cancel
          </Button>
        </ButtonGroup>
      </FormGroup>
    </GridItemDiv>
  );
};
export type GridItemDivVariant =
  | 'default'
  | 'hover'
  | 'selected'
  | 'target'
  | 'editing';

export const GridItemDiv = styled.div<{ variant: GridItemDivVariant }>`
  border-style: solid;
  border-width: 2px;
  ${variant({
    key: 'variant',
    variants: {
      default: {
        borderColor: 'blue.4',
      },
      hover: {
        bg: 'blue.7',
      },
      selected: { bg: 'yellow.5' },
      target: { bg: 'red.5' },
    },
  })};
`;
