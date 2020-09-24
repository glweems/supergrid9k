import { grid } from '@/store/grid';
import { Input } from '@rebass/forms/styled-components';
import React from 'react';
import { useRecoilState } from 'recoil';

const GridEditorName: React.FC = () => {
  const [gridState, setGridState] = useRecoilState(grid);
  const [value, setValue] = React.useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
    setGridState({ ...gridState, name: event.target.value });
  };

  return (
    <Input
      name="name"
      value={value}
      onChange={handleChange}
      placeholder="Layout Name"
      backgroundColor="text"
      color="primary"
      padding={1}
      fontSize="1.25rem"
      css={`
        font-weight: bold;
        border-radius: 0.5rem;
      `}
    />
  );
};
export default GridEditorName;
