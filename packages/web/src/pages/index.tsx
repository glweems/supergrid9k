import GridEditor from '../components/GridEditor/GridEditor';
import { grid } from '../state';
import { useRecoilState } from 'recoil';
import React from 'react';
import { defaultGridState } from '../lib/utils';

export default function IndexPage() {
  const [gridState, setGridState] = useRecoilState(grid);
  React.useEffect(() => {
    if (!gridState) setGridState({ ...defaultGridState, initialState: defaultGridState });
  }, [gridState, setGridState]);

  return <GridEditor />;
}
