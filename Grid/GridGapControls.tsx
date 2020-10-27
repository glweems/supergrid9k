import { Box, FormGroup, Grid, TextInput } from '@primer/components';
import { Entry, GridState } from 'css-grid-template-parser';
import { startCase } from 'lodash';
import React, { FC, memo } from 'react';
import { selectorFamily, useRecoilValue, useSetRecoilState } from 'recoil';
import Select from '@components/Select';
import { gridGapUnits } from '@lib/utils';
import { gridState } from './gridState';

const gridGapState = selectorFamily<Entry, keyof GridState['gap']>({
  key: 'gridGap',
  get: (id) => ({ get }) => {
    const grid = get(gridState);
    if (!grid) return;
    return grid.gap[id];
  },
  set: (id) => ({ set }, newValue) => {
    return set(gridState, (prev) => ({
      ...prev,
      gap: {
        ...prev.gap,
        [id]: newValue,
      },
    }));
  },
});

const GridGapControls = () => {
  return (
    <FormGroup bg="bg.grayLight">
      <FormGroup.Label fontWeight="bold" fontSize="16px">
        <span>Grid Gap</span>
      </FormGroup.Label>
      <GridGapControl id="rowGap" />
      <GridGapControl id="columnGap" />
    </FormGroup>
  );
};

GridGapControls.displayName = 'GridGapControls';

const GridGapControl: FC<{ id: keyof GridState['gap'] }> = ({ id }) => {
  const gridGap = useRecoilValue(gridGapState(id));
  const setGridGap = useSetRecoilState(gridGapState(id));
  return (
    <Grid gridTemplateColumns="1fr 1fr" gridTemplateRows="1fr 1fr">
      <Box style={{ gridArea: '1 / 1 / 2 / 3' }}>{startCase(id)}</Box>
      <div>
        <TextInput
          name="amount"
          type="number"
          autoComplete="off"
          value={gridGap?.amount}
          onChange={(event) => {
            if (event.target === event.currentTarget)
              return setGridGap({
                ...gridGap,
                [event.currentTarget.name]: event.currentTarget.value,
              });
          }}
        />
      </div>
      <div>
        <Select
          name="unit"
          value={gridGap?.unit}
          options={gridGapUnits}
          onChange={(event) => {
            if (event.target === event.currentTarget)
              setGridGap({
                ...gridGap,
                [event.currentTarget.name]: event.currentTarget.value,
              });
          }}
        />
      </div>
    </Grid>
  );
};

GridGapControl.displayName = 'GridGapControl';
export default GridGapControls;
