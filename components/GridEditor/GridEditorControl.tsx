import { Input } from '@rebass/forms/styled-components';
import React from 'react';
import { Button } from 'rebass/styled-components';
import { CloseIcon } from '@/lib/Icons';
import { GridStateName, GridTemplateEntry, useControlHandlers } from '@/store/grid';
import Select from '../Select';
import { gridGapUnits, gridUnits } from '@/lib/utils';
export interface GridEditorControlProps extends GridTemplateEntry {
  name: GridStateName;
}

export const GridEditorControl: React.FC<GridEditorControlProps> = ({ id, amount, unit, name, inputProps }) => {
  const { handleChange, handleDelete, canDelete } = useControlHandlers(name, id);

  return (
    <React.Fragment>
      {name !== 'gridGap' && (
        <Button className="remove-entry" onClick={handleDelete} variant="default" disabled={canDelete}>
          <CloseIcon size={25} />
        </Button>
      )}

      <Input name="amount" className="control-start" value={amount} onChange={handleChange} {...inputProps} />

      <Select
        name="unit"
        className="control-end"
        value={unit}
        onChange={handleChange}
        options={name === 'gridGap' ? gridGapUnits : gridUnits}
      />
    </React.Fragment>
  );
};
