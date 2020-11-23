import Select from '@components/Select';
import { gridGapUnits } from '@lib/utils';
import { Grid } from '@primer/components';
import { GrabberIcon } from '@primer/octicons-react';
import { Entry, GridState } from 'css-grid-template-parser';
import React, { FC, memo } from 'react';
import { selectorFamily, useRecoilValue, useSetRecoilState } from 'recoil';
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
    <div>
      <label>
        <span>Grid Gap</span>
      </label>
      <GridGapControl id="rowGap" />
      <GridGapControl id="columnGap" />
    </div>
  );
};

GridGapControls.displayName = 'GridGapControls';

const GridGapControl: FC<{ id: keyof GridState['gap'] }> = ({ id }) => {
  const gridGap = useRecoilValue(gridGapState(id));
  const setGridGap = useSetRecoilState(gridGapState(id));
  return (
    <Grid
      gridTemplateColumns="auto auto auto"
      padding={2}
      justifyContent="start"
      alignItems="start"
      // style={style}
      // onPointerEnter={onEnter}
      // onPointerLeave={onLeave}
      gridGap="0 0.5rem"
    >
      <div>
        <GrabberIcon />
      </div>

      <input
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
      <Select
        name="unit"
        className="btn"
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
    </Grid>
  );
};

GridGapControl.displayName = 'GridGapControl';
export default memo(GridGapControls);
