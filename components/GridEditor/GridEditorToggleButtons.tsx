import { ui } from '@/store/ui';
import Button from '@/ui/Button';
import React from 'react';
import { useRecoilState } from 'recoil';

export const ToggleControlsButton: React.FC = (props) => {
  const [{ gridEditor, ...uiState }, setUiState] = useRecoilState(ui);
  console.log(uiState, gridEditor, setUiState, props);
  return (
    <Button width="100%" variant="buttons.default">
      Toggle Controls
    </Button>
  );
};
