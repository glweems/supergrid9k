import Select from '@components/Select';
import { colors } from '@lib/theme';
import { gridUnits } from '@lib/utils';
import { Grid } from '@primer/components';
import { GrabberIcon, XIcon } from '@primer/octicons-react';
import { useShiftKeyPressed } from '@ui/useShftKeyPressed';
import React, { FC, memo, useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { GridControlObjKey } from './GridControlId';
import { gridControlState, selectedControlState } from './gridState';
type Handler = (
  e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
) => void;

const GridControlProperties: FC<{
  id: string | `${GridControlObjKey}.${number}`;
}> = ({ id }) => {
  const { canDelete, ...control } = useRecoilValue(gridControlState(id));
  const [selectedIds, setSelectedIds] = useRecoilState(selectedControlState);
  const setControl = useSetRecoilState(gridControlState(id));
  const shiftKeyPressed = useShiftKeyPressed();
  const handleChange: Handler = useCallback(
    (e) => {
      setControl((prev) => ({
        ...prev,
        [e.currentTarget.name]: e.currentTarget.value,
      }));
    },
    [setControl]
  );
  const isSelected = selectedIds.includes(id);
  const style = isSelected
    ? id.split('.').includes('rows')
      ? {
          background: colors.yellow[4],
          boxShadow: `0 2px 0 0 ${colors.yellow[8]}`,
        }
      : {
          background: colors.blue[4],
          boxShadow: `0 2px 0 0 ${colors.blue[8]}`,
        }
    : { background: 'transparent' };

  const onEnter = useCallback(() => {
    setSelectedIds((ids) => {
      // Do nothing if the element is already selected
      if (isSelected) return ids;

      // Add this element to the selection if shift is pressed
      if (shiftKeyPressed) return [...ids, id];

      // Otherwise, make this one the only selected element
      return [id];
    });
  }, [id, isSelected, setSelectedIds, shiftKeyPressed]);
  const onLeave = useCallback(() => {
    if (!shiftKeyPressed) setSelectedIds([]);
  }, [setSelectedIds, shiftKeyPressed]);
  return (
    <Grid
      gridTemplateColumns="auto repeat(3, 1fr)"
      padding={2}
      style={style}
      justifyContent="start"
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      gridGap="0 0.5rem"
    >
      <div>
        <GrabberIcon />
      </div>

      <input
        className="btn"
        autoComplete="off"
        name="amount"
        type="number"
        value={control.amount}
        onChange={handleChange}
        css={`
          width: 100px;
        `}
      />
      <Select
        className="btn"
        name="unit"
        value={control.unit}
        onChange={handleChange}
        options={gridUnits}
      />
      <button
        className="btn"
        disabled={canDelete}
        onMouseDown={() => setControl(null)}
      >
        <XIcon />
      </button>
    </Grid>
  );
};

export default memo(GridControlProperties);
