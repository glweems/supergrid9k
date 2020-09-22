import { NextPage } from 'next';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import CodeBlock from '../components/CodeBlock';
import { defaultGridState } from '../lib/utils';
import { grid, snippets } from '../store/grid';

const Test: NextPage = () => {
  const [gridState, setGridState] = useRecoilState(grid);
  const { css, html } = useRecoilValue(snippets);
  React.useEffect(() => {
    if (!gridState) setGridState(defaultGridState);
  }, [gridState, setGridState]);
  console.log('gridState: ', gridState);

  return (
    <div>
      <CodeBlock language="css" code={css} />
      <CodeBlock language="html" code={html} />
      {JSON.stringify(html)}
    </div>
  );
};
export default Test;
