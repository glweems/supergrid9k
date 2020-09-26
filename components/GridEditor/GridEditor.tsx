import { prettyControlName } from '@/lib/utils';
import { GridControlObjKey, GridState } from '@/store/grid';
import Box from '@/ui/Box';
import { motion, MotionProps } from 'framer-motion';
import produce from 'immer';
import React from 'react';
import { use100vh } from 'react-div-100vh';
import { Flex } from 'rebass';
import Button from '@/ui/Button';
import styled from 'styled-components/macro';
import { layout } from 'styled-system';
import useSWR, { mutate } from 'swr';
import If from '../If';
import { GridEditorContextProvider, useGridEditorContext } from './GridContext';
import { GridEditorControl } from './GridEditorControl';
import GridEditorItems from './GridEditorItems';
export interface GridEditorProps {
  endpoint: string;
  grid?: GridState;
  initialData?: GridState;
}

const GridEditor: React.FC<GridEditorProps> = ({ endpoint, initialData }) => {
  const { data, error } = useSWR<GridState, GridState>(endpoint, {
    initialData,
    refreshInterval: 0,
    revalidateOnMount: false,
  });
  const vp = use100vh();

  return (
    <Layout height={`calc(${vp}px - 3.75rem)`}>
      <Box as={motion.aside} className="grid-sidebar">
        <EditorControlStack objKey="gridTemplateRows" endpoint={endpoint} />
        <EditorControlStack objKey="gridTemplateColumns" endpoint={endpoint} />
        <EditorControlStack objKey="gridGap" endpoint={endpoint} />
      </Box>

      <Box className="grid-items" height="100%">
        <GridEditorItems endpoint={endpoint} />
      </Box>

      <Box
        as="section"
        className="toolbar"
        height="3.5rem"
        display="flex"
        justifyItems="flex-end"
        justifyContent="flex-end"
        alignItems="center"
        // variant="nav"
      >
        <Box ml="auto">
          <Button bg="muted">Code</Button>
        </Box>
      </Box>
    </Layout>
  );
};

const motionProps = {
  initial: { opacity: 0, y: 30, scale: 0.5 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 30 },
  transition: { duration: 0.25 },
};

const EditorControlStack: React.FC<{
  endpoint: string;
  objKey: GridControlObjKey;
  // addEntry: React.MouseEventHandler<HTMLButtonElement>;
  // gridState: GridState;
  // setGridState: setGridState;
}> = ({ objKey, endpoint }) => {
  const { data, error } = useSWR<GridState>(endpoint, {});

  if (error) return <div>error</div>;

  const addEntry = () => {
    if (data) {
      const entries = data?.[objKey];
      const lastEntry = {
        ...entries?.slice(-1)[0],
      };

      mutate(
        endpoint,
        produce((draft) => {
          draft[objKey].push(lastEntry);
        }),
        false
      );

      // if (!isDirty) setIsDirty(true);
    }
  };

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
      <motion.ul>
        {data?.[objKey].map((item, index) => {
          return (
            <Box
              key={`control-${objKey}-${index}`}
              as={motion.li}
              display="flex"
              alignItems="center"
              marginTop="-2px"
              height={'auto'}
              {...motionProps}
            >
              <GridEditorControl
                endpoint={endpoint}
                objKey={objKey}
                index={index}
                {...item}
              />
            </Box>
          );
        })}
      </motion.ul>
    </div>
  );
};

const Layout = styled(Box)`
  ${layout};
  display: grid;
  grid-template-areas:
    'grid-sidebar toolbar'
    'grid-sidebar grid-items';
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  width: 100vw;

  .toolbar {
    display: flex;
    grid-area: toolbar;
    justify-content: flex-end;
    padding: var(--space-2);
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
`;

Layout.displayName = 'GridEditorLayout';
export default GridEditor;
