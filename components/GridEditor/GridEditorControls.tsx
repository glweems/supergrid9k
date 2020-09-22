import { PlusIcon } from '@/lib/Icons';
import {
  GridStateName,
  GridTemplateEntry,
  useGridTemplate,
} from '@/store/grid';
import { Control } from '@/ui/Control';
import React from 'react';
import Button from '@/ui/Button';
import Box from '../../ui/Box';
import If from '../If';
import { GridEditorControl } from './GridEditorControl';

function GridEditorControls() {
  const rowData = useGridTemplate('gridTemplateRows', 'Grid Rows');
  const columnData = useGridTemplate('gridTemplateColumns', 'Grid Columns');
  const gapData = useGridTemplate('gridGap', 'Grid Gap');
  return (
    <React.Fragment>
      <GridTemplateControls {...rowData} />
      <GridTemplateControls {...columnData} />
      <GridTemplateControls {...gapData} />
    </React.Fragment>
  );
}

export interface GridTemplateControlProps {
  name: GridStateName;
  addEntry: React.MouseEventHandler<HTMLButtonElement>;
  entries?: GridTemplateEntry[];
  legend: string;
}

export const GridTemplateControls: React.FC<GridTemplateControlProps> = ({
  name,
  entries,
  addEntry,
  legend,
}) => {
  return (
    <div className="elements">
      <label className="control-label">{legend}</label>

      <ul>
        {entries?.map((entry, index) => {
          return (
            <Box as="li" key={`${name}-${index}`} m={0}>
              <GridEditorControl name={name} {...entry} index={index} />
            </Box>
          );
        })}
      </ul>

      {/* Button To Add New GridTemplate Entry */}
      <If isTrue={name !== 'gridGap'}>
        <Button
          className="add-entry"
          onClick={addEntry}
          color="green"
          variant="outline"
        >
          <PlusIcon size={28} padding={0} />
        </Button>
      </If>
    </div>
  );
};

export default GridEditorControls;
