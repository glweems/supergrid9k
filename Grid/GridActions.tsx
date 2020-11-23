import React, { FC, memo } from 'react';
import { atom, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

export type OptionsState = {
  showCode: boolean;
  useCssRepeatFn: boolean;
  className: string;
  width: number;
  showSidebar: boolean;
};

export const optionsState = atom<OptionsState>({
  key: 'options',
  default: {
    showCode: true,
    showSidebar: true,
    useCssRepeatFn: false,
    className: 'grid',
    width: 300,
  },
});
type GridActionsProps = { className: string };

const GridActions: FC<GridActionsProps> = ({ className }) => {
  const setOptions = useSetRecoilState(optionsState);
  const handleToggle = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void =>
    setOptions((prev) => ({
      ...prev,
      [e.currentTarget.name]: !prev[e.currentTarget.name],
    }));
  return (
    <GridActionsStyles className={className}>
      <button name="showSidebar" onClick={handleToggle}>
        sidebar
      </button>
      <button name="showCode" onClick={handleToggle}>
        show code
      </button>
    </GridActionsStyles>
  );
};

const GridActionsStyles = styled.div`
  display: flex;
  place-items: center;
  justify-content: space-between;
  padding: 0 ${(props) => props.theme.space[3]};
  background-color: ${({ theme }) => theme.colors.bg.grayDark};

  label {
    color: ${(props) => props.theme.colors.bodytext};
    background-color: ${(props) => props.theme.colors.yellow[4]};
  }
  .btn {
    width: unset;
  }
`;

export default memo(GridActions);
