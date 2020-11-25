import Select from '@components/Select';
import theme from '@lib/theme';
import { gridGapUnits } from '@lib/utils';
import { GrabberIcon } from '@primer/octicons-react';
import { Entry, GridState } from 'css-grid-template-parser';
import React, { FC, memo } from 'react';
import { selectorFamily, useRecoilValue, useSetRecoilState } from 'recoil';
import { gridPropertiesStyles } from './GridControlProperties';
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
    <div
      style={{
        ...gridPropertiesStyles,
        gridTemplateColumns: 'auto repeat(2,1fr) 3ch',
      }}
      // style={style}
      // onPointerEnter={onEnter}
      // onPointerLeave={onLeave}
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
          return setGridGap({
            ...gridGap,
            [event.currentTarget.name]: event.currentTarget.value,
          });
        }}
      />
      <Select
        name="unit"
        value={gridGap?.unit}
        options={gridGapUnits}
        onChange={(event) => {
          setGridGap({
            ...gridGap,
            [event.currentTarget.name]: event.currentTarget.value,
          });
        }}
      />
    </div>
  );
};

GridGapControl.displayName = 'GridGapControl';
export default memo(GridGapControls);
