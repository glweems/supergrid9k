import { ButtonOutline, Flex, TextInput } from '@primer/components';
import { GrabberIcon, XCircleFillIcon } from '@primer/octicons-react';
import React, { memo } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Select from '../components/Select';
import { gridUnits } from '../lib/utils';
import { useShiftKeyPressed } from '../ui/useShftKeyPressed';
import { selectedControlState, gridControlState } from './gridState';

export const GridControlProperties = memo(({ id }: { id: string }) => {
  const { canDelete, ...control } = useRecoilValue(gridControlState(id));
  const [selectedIds, setSelectedIds] = useRecoilState(selectedControlState);
  const setControl = useSetRecoilState(gridControlState(id));
  const shiftKeyPressed = useShiftKeyPressed();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
  ) => {
    if (e.target === e.currentTarget)
      setControl((prev) => ({
        ...prev,
        [e.currentTarget.name]: [e.currentTarget.value],
      }));
  };
  const isSelected = selectedIds.includes(id);
  const bg = isSelected ? 'blue.1' : 'bg.grayLight';
  return (
    <Flex
      padding={2}
      bg={bg}
      onMouseEnter={() => {
        setSelectedIds((ids) => {
          // Do nothing if the element is already selected
          if (isSelected) return ids;

          // Add this element to the selection if shift is pressed
          if (shiftKeyPressed) return [...ids, id];

          // Otherwise, make this one the only selected element
          return [id];
        });
      }}
    >
      <ButtonOutline
        disabled={canDelete}
        onMouseDown={(e) => setControl(null)}
        sx={{ border: 'none' }}
      >
        <XCircleFillIcon />
      </ButtonOutline>
      <TextInput
        autoComplete="off"
        name="amount"
        type="number"
        value={control.amount}
        onChange={handleChange}
        bg="bg.grayLight"
      />
      <Select
        name="unit"
        value={control.unit}
        onChange={handleChange}
        options={gridUnits}
      />
    </Flex>
  );
});
GridControlProperties.displayName = 'GridControlProperties';
