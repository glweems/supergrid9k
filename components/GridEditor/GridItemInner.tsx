import { Button, ButtonGroup, FormGroup, TextInput } from '@primer/components';
import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { variant } from 'styled-system';
import { GridState } from 'css-grid-template-parser';
import { GridItemProps } from './GridItem';
import If from '../If';

export function GridItemInner(props: GridItemProps) {
  const formik = useFormikContext<GridState>();
  const [isEditable, setIsEditable] = React.useState(false);
  const [name, setName] = React.useState('');

  useEffect(() => {
    if (!isEditable && props.name === 'temp') setIsEditable(true);
  }, [isEditable, props.name]);

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
    <div>
      <If isTrue={isEditable}>
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
      </If>
    </div>
  );
}
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
