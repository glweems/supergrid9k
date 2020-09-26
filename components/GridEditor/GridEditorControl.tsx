import { Icon } from '@/lib/Icons';
import { gridGapUnits, gridUnits } from '@/lib/utils';
import { GridControlObjKey, GridState, GridTemplateEntry } from '@/store/grid';
import Box from '@/ui/Box';
import Button from '@/ui/Button';
import { Input } from '@rebass/forms/styled-components';
import { motion } from 'framer-motion';
import produce from 'immer';
import React from 'react';
import useSWR, { mutate } from 'swr';
import If from '../If';
import Select from '../Select';
import { useImmer } from 'use-immer';
import { useGridEditorContext } from './GridContext';
import _ from 'lodash';
export interface GridEditorControlProps extends GridTemplateEntry {
  objKey: GridControlObjKey;
  index: number;
  endpoint: string;
}

export const GridEditorControl: React.FC<GridEditorControlProps> = ({
  objKey,
  index,
  amount,
  endpoint,
  unit,
}) => {
  const { data, error } = useSWR<GridState>(endpoint, {
    refreshInterval: 0,
    revalidateOnMount: false,
  });
  const control = data?.[objKey]?.[index];
  const [state, setState] = useImmer(control);

  const isGap = objKey === 'gridGap';

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    const { name, value } = event.target;

    setState((draft) => {
      draft[name] = value;
    });

    mutate(
      endpoint,
      produce((draft: GridState) => {
        draft[objKey][index][name] = value;
      }),
      false
    );

    // if (!isDirty) setIsDirty(true);
  };

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    mutate(
      endpoint,
      produce((draft: GridState) => {
        draft?.[objKey]?.splice(index, 1);
      }),
      false
    );
  };

  const canDelete = data?.[objKey].length < 2;

  const loading = !error && data?.[objKey].length < 1;
  if (loading) return <div>loading</div>;

  return (
    <React.Fragment>
      <If isTrue={!isGap}>
        <Button
          marginLeft="0px"
          className="remove-entry"
          onClick={_.throttle(handleDelete, 200)}
          disabled={canDelete}
          bg="transparent"
          height="100%"
          color="red"
        >
          <Icon size={26}>
            <path
              fillRule="evenodd"
              d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z"
            />
          </Icon>
        </Button>
      </If>

      <Input
        name="amount"
        className="control-start"
        value={state.amount}
        onChange={handleChange}
        type="number"
        min="0"
        autoComplete="off"
        disabled={state.unit === 'auto'}
      />

      <Select
        name="unit"
        className="control-end"
        value={state?.unit}
        onChange={handleChange}
        options={isGap ? gridGapUnits : gridUnits}
        minWidth="80px"
        marginLeft="-2px"
      />
    </React.Fragment>
  );
};
/*   const update = () =>

 */
