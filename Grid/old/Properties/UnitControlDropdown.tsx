import { Dropdown, Text } from '@primer/components';
import React, { useState } from 'react';
export type UnitControlDropdownProps = {
  options: (string | number)[];
};
export default function UnitControlDropdown({
  options,
}: UnitControlDropdownProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('unit');
  const handleToggle = (
    e: React.SyntheticEvent<HTMLDetailsElement, Event>
  ): void => setOpen(e.currentTarget.open);

  const handleOutsideClick = () => setOpen(false);

  function handleItemClick(
    opt: any
  ): (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void {
    return () => {
      setValue(opt);
      setOpen(false);
    };
  }
  return (
    <Dropdown
      open={open}
      onToggle={handleToggle}
      onClickOutside={handleOutsideClick}
      overlay={true}
      css={`
        list-style: none;
        display: flex;
        place-items: center;
      `}
    >
      <Dropdown.Button>{value}</Dropdown.Button>
      <Dropdown.Menu direction="sw">
        {options.map((opt) => (
          <Dropdown.Item key={opt} onClick={handleItemClick(opt)}>
            <Text color={opt === value ? 'gray.3' : 'text'}>{opt}</Text>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export type GridControlUnit =
  | 'fr'
  | '%'
  | 'px'
  | 'vw'
  | 'vh'
  | 'em'
  | 'rem'
  | 'auto';

export const gridUnits: GridControlUnit[] = [
  'fr',
  '%',
  'px',
  'vw',
  'vh',
  'em',
  'rem',
  'auto',
];

UnitControlDropdown.defaultProps = {
  options: gridUnits,
};
