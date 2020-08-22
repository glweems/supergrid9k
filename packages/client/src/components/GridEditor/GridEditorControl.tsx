import React from 'react';
import { useRecoilState } from 'recoil';
import { CloseIcon } from '../../lib/Icons';
import { getAllowedEntry, removeItemAtIndex, replaceItemAtIndex } from '../../lib/utils';
import { grid, GridState, GridTemplateEntry, useControlHandlers } from '../../state';
import Select from '../Select';
import { Input } from '@rebass/forms/styled-components';
import { Button } from 'rebass/styled-components';
export interface GridEditorControlProps extends GridTemplateEntry {
  name: keyof Pick<GridState, 'gridTemplateColumns' | 'gridTemplateRows'>;
}

export const GridEditorControl: React.FC<GridEditorControlProps> = ({
  id,
  amount,
  unit,
  inputProps,
  selectProps,
  name,
}) => {
  const idk = useControlHandlers(name, id);

  return (
    <React.Fragment>
      <Input name="amount" defaultValue={amount} onChange={idk.handleChange} {...inputProps} />

      <Select name="unit" defaultValue={unit} onChange={idk.handleChange} {...selectProps} />

      <Button className="remove-entry" onClick={idk.handleDelete} variant="close" disabled={idk.canDelete}>
        <CloseIcon size={25} />
      </Button>
    </React.Fragment>
  );
};
