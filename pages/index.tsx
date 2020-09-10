import GridEditor from '@/components/GridEditor/GridEditor';
import { grid } from '@/store/grid';
import { useRecoilState } from 'recoil';
import React from 'react';
import { defaultGridState } from '@/lib/utils';
import Div100vh from 'react-div-100vh';
import Navbar from '@/ui/Navbar';

export default function IndexPage() {
  const [gridState, setGridState] = useRecoilState(grid);
  React.useEffect(() => {
    if (!gridState) setGridState({ ...defaultGridState, initialState: defaultGridState });
  }, [gridState, setGridState]);

  return (
    <Div100vh>
      <Navbar title="super grid 9k" />
      <GridEditor />
    </Div100vh>
  );
}
