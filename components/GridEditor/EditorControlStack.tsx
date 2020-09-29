import { prettyControlName } from '@/lib/utils';
import { GridControlObjKey } from '@/store/grid';
import Box from '@/ui/Box';
import Button from '@/ui/Button';
import {
  entriesArrayParser,
  Entry,
  flatten,
  RawGridState,
} from 'css-grid-template-parser';
import React from 'react';
import { Flex } from 'rebass';
import useSWR, { mutate } from 'swr';
import If from '../If';
import { GridEditorControl } from './GridEditorControl';

export interface EditorControlStackProps {
  endpoint: string;
  objKey: GridControlObjKey;
  controls: Entry[];
  mutator: (val: Entry[]) => Promise<void>;
  canDelete: boolean;
}

export const EditorControlStack: React.FC<EditorControlStackProps> = ({
  objKey,
  endpoint,
  controls,
  canDelete,
}) => {
  const { data, error } = useSWR<RawGridState>(endpoint, {
    refreshInterval: 0,
    revalidateOnMount: false,
    revalidateOnFocus: false,
  });
  const [entries, setEntries] = React.useState<Entry[]>(controls);

  React.useEffect(() => {
    if (data?.[objKey]) {
      setEntries(entriesArrayParser(data[objKey]));
    }
  }, [data, objKey, setEntries]);

  if (error) return <div>error</div>;

  const addEntry = () => {
    if (data) {
      const lastEntry = {
        ...controls?.slice(-1)[0],
      };

      setEntries((state) => [...state, lastEntry]);

      const newData = { ...data, [objKey]: flatten([...controls, lastEntry]) };

      mutate(endpoint, newData, false);
    }
  };

  return (
    <section>
      <Flex flexDirection="column" justifyContent="stretch" padding={1}>
        <label className="control-label">{prettyControlName(objKey)}</label>

        <If isTrue={objKey !== 'gridGap'} animated>
          <Button
            name={objKey}
            onClick={addEntry}
            color="background"
            bg="green"
            padding={0}
            paddingX={2}
            width="100%"
            alignSelf="flex-end"
          >
            +
          </Button>
        </If>
      </Flex>

      <ul>
        {controls.map((item, index) => (
          <Box
            key={`control-${objKey}-${index}`}
            display="flex"
            alignItems="center"
            marginTop="-2px"
            height={'auto'}
          >
            <GridEditorControl
              canDelete={canDelete}
              endpoint={endpoint}
              objKey={objKey}
              index={index}
              entries={entries}
              {...item}
            />
          </Box>
        ))}
      </ul>
    </section>
  );
};
