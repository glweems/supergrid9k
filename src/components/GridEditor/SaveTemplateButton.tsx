import React from 'react';
import { Button } from 'rebass/styled-components';
import { useCreateGrid } from '../../lib/GridApi';

export default function SaveTemplateButton() {
  const buttonProps = useCreateGrid();
  return <Button className="SaveTemplateButton" {...buttonProps} />;
}
