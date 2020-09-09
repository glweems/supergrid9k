import React from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import { RecoilDevtools } from 'recoil-devtools';
import { RecoilLogger } from 'recoil-devtools-logger';
import { grid } from '../store/grid';
import { ui } from '../store/ui';

const RecoilDebugger: React.FC = () =>
  true ? null : (
    <RecoilDevtools values={[grid, ui]}>
      <ReactQueryDevtools />
      <RecoilLogger />
    </RecoilDevtools>
  );

export default RecoilDebugger;
