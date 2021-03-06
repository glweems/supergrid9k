import Select from '@components/Select';
import theme, { colors } from '@lib/theme';
import { gridUnits } from '@lib/utils';
import { GrabberIcon, XIcon } from '@primer/octicons-react';
import { useShiftKeyPressed } from '@ui/useShftKeyPressed';
import { Entry } from 'css-grid-template-parser';
import React, { CSSProperties, memo, useCallback } from 'react';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { GridControlObjKey } from './GridControlId';
import { gridControlState, selectedControlState } from './gridState';
type Handler = (
  e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
) => void;

type GridControlPropertiesProps = Entry & {
  id: string | `${GridControlObjKey}.${number}`;
  canDelete: boolean;
};

const GridControlProperties = SortableElement(
  ({ id, amount, unit, canDelete }: GridControlPropertiesProps) => {
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
    const style: CSSProperties = isSelected
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
        if (isSelected) return ids;
        if (shiftKeyPressed) return [...ids, id];
        return [id];
      });
    }, [id, isSelected, setSelectedIds, shiftKeyPressed]);

    const onLeave = useCallback(() => {
      if (!shiftKeyPressed) setSelectedIds([]);
    }, [setSelectedIds, shiftKeyPressed]);

    return (
      <div
        style={{ ...gridPropertiesStyles, ...style }}
        css={`
          &:focus,
          :focus-within {
            outline: 4px dashed ${colors.focus};
            outline-offset: 4px;
          }
        `}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
      >
        <DragHandle disabled={canDelete} />
        <input
          autoComplete="off"
          name="amount"
          type="number"
          value={amount}
          onChange={handleChange}
        />
        <Select
          name="unit"
          value={unit}
          onChange={handleChange}
          options={gridUnits}
        />
        <button
          className="close-btn"
          disabled={canDelete}
          onMouseDown={() => setControl(null)}
        >
          <XIcon size={28} />
        </button>
      </div>
    );
  }
);

const DragHandle = SortableHandle(({ disabled }) => (
  <div
    style={{
      cursor: disabled ? 'null' : 'grab',
      justifySelf: 'stretch',
      color: disabled ? colors.baseGlare : colors.white,
    }}
  >
    <GrabberIcon />
  </div>
));

export const gridPropertiesStyles: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'auto repeat(2, 1fr) auto',
  padding: theme.space[2],
  alignItems: 'center',
  justifyContent: 'start',
  columnGap: theme.space[2],
};

export default memo(GridControlProperties);
