import React from 'react';
import Button from '@/ui/Button';
import { useCreateGrid } from '@/lib/GridApi';

export default function SaveTemplateButton() {
  const buttonProps = useCreateGrid();
  return (
    <Button className="SaveTemplateButton" bg="primary" {...buttonProps} />
  );
}
