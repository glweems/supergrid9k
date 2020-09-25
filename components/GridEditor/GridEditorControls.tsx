import {
  GridControlObjKey,
  GridTemplateEntry,
  useGridTemplate,
} from '@/store/grid';
import Button from '@/ui/Button';
import { motion } from 'framer-motion';
import React from 'react';
import { Flex } from 'rebass';
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
  name: GridControlObjKey;
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
    <div>
      <Flex flexDirection="column" justifyContent="stretch" padding={1}>
        <label className="control-label">{legend}</label>
        {/* Button To Add New GridTemplate Entry */}
        <If isTrue={name !== 'gridGap'}>
          <Button
            onClick={addEntry}
            color="background"
            bg="green"
            padding={0}
            paddingX={2}
            width="100%"
            alignSelf="flex-end"
            css={``}
          >
            +
          </Button>
        </If>
      </Flex>

      <ul>
        {entries?.map((entry, index) => {
          return (
            <Box as={motion.li} key={`${name}-${index}`} m={0}>
              <GridEditorControl name={name} {...entry} index={index} />
            </Box>
          );
        })}
      </ul>
    </div>
  );
};

export default GridEditorControls;
