import { FilteredSearch, TextInput } from '@primer/components';
import { XCircleIcon } from '@primer/octicons-react';
import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import { gridControlState } from '../../pages/index';
import { GridControlState } from '../Properties';
import UnitControlDropdown from './UnitControlDropdown';

export const GridControlGroup: FC<GridControlState> = ({ id }) => {
  console.log('group: ', id);
  return (
    <FilteredSearch
      css={`
        .TextInput-wrapper {
          border-radius: 0;
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
        }

        summary {
          outline: none;
          border-radius: 0;
          border-bottom-right-radius: 6px;
          border-top-right-radius: 6px;
          border-width: 2px;
          margin-right: 1px;
          border-style: solid;
          border: 1px solid rgba(27, 31, 35, 0.12);
          box-shadow: 0px 1px 0px rgba(27, 31, 35, 0.04),
            inset 0px 2px 1px rgba(255, 255, 255, 0.25);
        }
      `}
    >
      <AmountInput group={id} />

      <UnitControlDropdown group={id} />
    </FilteredSearch>
  );
};

const AmountInput = ({ group }) => {
  const [control, setControl] = useRecoilState(gridControlState(group));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    /* if (e.currentTarget === e.target) */
    setControl({
      ...control,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  return (
    <TextInput
      icon={XCircleIcon}
      name="amount"
      value={control.amount}
      onChange={handleChange}
    />
  );
};
