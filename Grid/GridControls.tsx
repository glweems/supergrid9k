import {
  ButtonOutline,
  CircleOcticon,
  Flex,
  FormGroup,
} from '@primer/components';
import { capitalize } from 'lodash';
import React, { FC, memo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { PlusIcon } from '../lib/Icons';
import { GridControlsKey } from '../pages';
import { GridControlProperties } from './GridControlProperties';
import { gridControlsState } from './gridState';

type GridControlsProps = {
  id: GridControlsKey;
};

const GridControls: FC<GridControlsProps> = memo(({ id }) => {
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
      {controls?.map((_control, index) => (
        <GridControlProperties key={id + index} id={`${id}.${index}`} />
      ))}
    </FormGroup>
  );
});

GridControls.displayName = 'GridControls';
export default GridControls;
