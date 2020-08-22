import { Input } from '@rebass/forms/styled-components';
import React from 'react';
import { Button, Text } from 'rebass/styled-components';
import { useRecoilState } from 'recoil';
import Select from '../../components/Select';
import { PlusIcon } from '../../lib/Icons';
import { prettyName } from '../../lib/utils';
import { grid, GridState, GridTemplateEntry, useGridTemplate } from '../../state';
import { Control } from '../../ui/Control';
import { GridEditorControl } from './GridEditorControl';

function GridEditorControls() {
  const rowData = useGridTemplate('gridTemplateRows');
  const columnData = useGridTemplate('gridTemplateColumns');
  return (
    <React.Fragment>
      <GridTemplateControls {...rowData} />
      <GridTemplateControls {...columnData} />
      <GridEditorGapControls />
    </React.Fragment>
  );
}
interface GridTemplateControlProps {
  name: keyof Pick<GridState, 'gridTemplateColumns' | 'gridTemplateRows'>;
  addEntry: React.MouseEventHandler<HTMLButtonElement>;
  entries: GridTemplateEntry[];
}

const GridTemplateControls: React.FC<GridTemplateControlProps> = ({ name, entries, addEntry }) => {
  return (
    <Control>
      <div className="elements">
        <legend className="control-label">{prettyName(name)}</legend>

        {entries.map((entry) => (
          <GridEditorControl key={entry.id} {...entry} name={name} />
        ))}

        {/* Button To Add New GridTemplate Entry */}
        <Button className="add-entry" onClick={addEntry} color="green" variant="outline">
          <PlusIcon size={28} padding={0} />
        </Button>
      </div>
    </Control>
  );
};

export const GridEditorGapControls = () => {
  const [{ gridGap }, setGridState] = useRecoilState(grid);

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = ({
    target: { name, value },
  }) => {
    setGridState((prev) => ({
      ...prev,
      gridGap: { ...gridGap, [name]: value },
    }));
  };
  return (
    <Control control="gridGap">
      <Text as="h3" className="control-label" mb={3}>
        Grid Gap
      </Text>
      <Input name="amount" value={gridGap.amount} onChange={handleChange} {...gridGap.inputProps} />
      <Select name="unit" value={gridGap.unit} onChange={handleChange} {...gridGap.selectProps} />
    </Control>
  );
};

export default GridEditorControls;
