import { Input } from '@rebass/forms/styled-components';
import React from 'react';
import { Button, Flex } from 'rebass/styled-components';
import { CloseIcon } from '@/lib/Icons';
import { GridStateName, GridTemplateEntry, useControlHandlers } from '@/store/grid';
import Select from '../Select';
import { gridGapUnits, gridUnits } from '@/lib/utils';
import If from '../If';
import Box from '../../ui/Box';
export interface GridEditorControlProps extends GridTemplateEntry {
  name: GridStateName;
}

export const GridEditorControl: React.FC<GridEditorControlProps> = ({ id, amount, unit, name, inputProps }) => {
  const { handleChange, handleDelete, canDelete } = useControlHandlers(name, id);
  const [visable, setVisable] = React.useState(false);
  const handleMouseEnter = (e) => {
    setVisable(true);
  };

  const handleMouseLeave = () => {
    setVisable(false);
  };
  const isGap = name === 'gridGap';
  return (
    <Flex
      flexDirection="row-reverse"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      fontSize={12}
      justifyContent="space-between"
      alignItems="center"
    >
      <Box width="10%" textAlign="center" bg="yellow">
        <If isTrue={!isGap && visable}>
          <Button
            className="remove-entry"
            onClick={handleDelete}
            variant="default"
            disabled={canDelete}
            margin={0}
            p={0}
          >
            <CloseIcon size={25} />
          </Button>
        </If>
      </Box>
      <Box flexBasis="80%" display="flex">
        <Input
          name="amount"
          className="control-start"
          value={amount}
          onChange={handleChange}
          {...inputProps}
          flex="1 1 auto"
        />

        <Select
          name="unit"
          className="control-end"
          value={unit}
          onChange={handleChange}
          options={isGap ? gridGapUnits : gridUnits}
          minWidth="80px"
        />
      </Box>
    </Flex>
  );
};
