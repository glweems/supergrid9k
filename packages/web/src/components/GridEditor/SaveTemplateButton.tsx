import React from 'react';
import { Button } from 'rebass/styled-components';
import { useCreateGrid } from '../../api.ts/GridApi';

export default function SaveTemplateButton() {
  const { handleClick, isLoading } = useCreateGrid();
  return (
    <Button className="SaveTemplateButton" onClick={handleClick} disabled={isLoading}>
      Save Grid
    </Button>
  );
}
