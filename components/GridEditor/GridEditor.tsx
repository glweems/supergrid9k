import { prettyControlName } from '@/lib/utils';
import { GridControlObjKey, GridState } from '@/store/grid';
import Box from '@/ui/Box';
import { Input } from '@rebass/forms/styled-components';
import { motion } from 'framer-motion';
import React from 'react';
import { use100vh } from 'react-div-100vh';
import { Flex, Button } from 'rebass';
import { useRecoilState } from 'recoil';
import styled from 'styled-components/macro';
import { layout } from 'styled-system';
import useSWR from 'swr';
import getAllowedEntry from '../../lib/getAllowedEntry';
import { ui } from '../../store/ui';
import If from '../If';
import { GridEditorControl } from './GridEditorControl';
import GridEditorItems from './GridEditorItems';
export interface GridEditorProps {
  endpoint: string;
  grid?: GridState;
  initialData?: GridState;
}

type setGridState = React.Dispatch<React.SetStateAction<GridState>>;

const GridEditor: React.FC<GridEditorProps> = ({ endpoint, initialData }) => {
  const { data, error, mutate } = useSWR<GridState, GridState>(endpoint, {
    initialData,
    refreshInterval: 0,
    shouldRetryOnError: false,
    revalidateOnMount: false,
    revalidateOnFocus: false,
    refreshWhenHidden: false,
  });

  const vp = use100vh();

  return (
    <Layout height={vp + 'px'}>
      <Box as={motion.aside} className="grid-sidebar">
        <EditorControlStack objKey="gridTemplateRows" endpoint={endpoint} />
        <EditorControlStack objKey="gridTemplateColumns" endpoint={endpoint} />
        <EditorControlStack objKey="gridGap" endpoint={endpoint} />
      </Box>

      <Box className="grid-items" height="100%">
        {JSON.stringify(data, null, 2)}
        <GridEditorItems />
      </Box>

      <motion.section className="toolbar"></motion.section>
    </Layout>
  );
};

const EditorControlStack: React.FC<{
  endpoint: string;
  objKey: GridControlObjKey;
  // addEntry: React.MouseEventHandler<HTMLButtonElement>;
  // gridState: GridState;
  // setGridState: setGridState;
}> = ({ objKey, endpoint }) => {
  const { data, error, mutate } = useSWR<GridState>(endpoint, {
    refreshInterval: 0,
    revalidateOnMount: false,
    revalidateOnFocus: false,
    refreshWhenHidden: false,
  });

  const addEntry = () => {
    if (data) {
      const entries = data?.[objKey];
      const lastEntry = {
        ...entries?.slice(-1)[0],
      };

      const newEntries = [...entries, lastEntry];

      mutate({ ...data, [objKey]: newEntries }, false);

      // if (!isDirty) setIsDirty(true);
    }
  };

  if (data?.[objKey])
    return (
      <div>
        <Flex flexDirection="column" justifyContent="stretch" padding={1}>
          <label className="control-label">{prettyControlName(objKey)}</label>
          {/* Button To Add New GridTemplate Entry */}
          <If isTrue={objKey !== 'gridGap'}>
            <Button
              name={objKey}
              onClick={addEntry}
              color="background"
              bg="green"
              padding={0}
              paddingX={2}
              width="100%"
              alignSelf="flex-end"
              css={``}
            >
              +
            </Button>
          </If>
        </Flex>
        {data?.[objKey]
          ?.filter((obj) => obj !== null)
          .map((item, index) => {
            return (
              <GridEditorControl
                endpoint={endpoint}
                key={`control-${objKey}-${index}`}
                objKey={objKey}
                index={index}
                {...item}
              />
            );
          })}
      </div>
    );
  return null;
};

const Layout = motion.custom(styled(Box)`
  ${layout};
  display: grid;
  grid-template-areas:
    'grid-sidebar toolbar'
    'grid-sidebar grid-items';
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  width: 100vw;

  .toolbar {
    grid-area: toolbar;
    display: grid;
    grid-template-columns: auto 1fr auto;
    place-items: center;
    div {
      place-items: center;
      display: grid;
      grid-template-columns: auto 1fr auto;
    }
  }

  aside {
    grid-area: grid-sidebar;
    overflow-y: auto;
    color: var(--color-text);
    width: 250px;
    padding: 0;
    margin: 0;
    overflow: hidden;
    overflow-y: auto;
    color: var(--color-text);
    width: 250px;
    border-right-color: var(--color-muted);
    border-right-width: 1px;
    border-right-style: solid;
    background-color: var(--color-secondary);
    :first-child {
      padding: var(--space-3);
    }
  }

  .grid-items {
    grid-area: grid-items;
  }

  form {
    margin: 0;
  } /* max-width: 100vw; */

  /* Input */
  @supports selector(:) {
    button:focus {
      outline: none;
    }
  }
`);

Layout.displayName = 'GridEditorLayout';
export default GridEditor;
