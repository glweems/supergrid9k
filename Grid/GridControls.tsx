import { PlusIcon } from '@lib/Icons';
import {
  Box,
  ButtonOutline,
  CircleOcticon,
  Flex,
  FormGroup,
} from '@primer/components';
import { capitalize } from 'lodash';
import React, { FC } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { GridControlId, GridControlObjKey } from './GridControlId';
import { GridControlProperties } from './GridControlProperties';
import { gridControlsState } from './gridState';

type GridControlsProps = {
  id: GridControlObjKey;
};

const GridControls: FC<GridControlsProps> = ({ id }) => {
  const controls = useRecoilValue(gridControlsState(id));
  const setControls = useSetRecoilState(gridControlsState(id));
  const handleAdd = (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    setControls(controls);
  return (
    <FormGroup bg="bg.grayLight">
      <FormGroup.Label fontWeight="bold" fontSize="16px">
        <Flex justifyContent="space-between" alignItems="center">
          <span>Grid Template {capitalize(id)}</span>
          <ButtonOutline onClick={handleAdd} variant="small">
            <CircleOcticon icon={PlusIcon} size={20} />
          </ButtonOutline>
        </Flex>
      </FormGroup.Label>
      <Box sx={{ maxHeight: '200px', overflowY: 'auto' }}>
        {controls?.map((_control, index) => (
          <GridControlProperties
            key={`${id}.${index}`}
            id={`${id}.${index}` as GridControlId}
          />
        ))}
      </Box>
    </FormGroup>
  );
};

GridControls.displayName = 'GridControls';
export default GridControls;
