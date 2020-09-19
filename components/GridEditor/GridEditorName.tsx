import { grid } from '@/store/grid';
import Box from '@/ui/Box';
import { Input, Label } from '@rebass/forms/styled-components';
import React from 'react';
import { useRecoilState } from 'recoil';

const GridEditorName: React.FC = () => {
  const [gridState, setGridState] = useRecoilState(grid);
  const [value, setValue] = React.useState(gridState.name);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
    setGridState((prev) => ({ ...prev, name: event.target.value }));
  };

  return (
    <Box>
      <Label display="flex" flexDirection="column">
        <Box width="100%">Template Name</Box>
        <Input name="name" value={value} onChange={handleChange} />
      </Label>
    </Box>
  );
};
export default GridEditorName;
