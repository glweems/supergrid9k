import { fetcher } from '@lib/fetcher';
import { PlusIcon } from '@lib/Icons';
import {
  BorderBox,
  Box,
  ButtonOutline,
  CircleOcticon,
  Flex,
  FormGroup,
  Grid,
  TextInput,
} from '@primer/components';
import Navbar from '@ui/Navbar';
import { useShiftKeyPressed } from '@ui/useShftKeyPressed';
import { Entry, GridState } from 'css-grid-template-parser';
import { capitalize } from 'lodash';
import { GetServerSideProps, NextPage } from 'next';
import React, { FC, useState } from 'react';
import {
  atom,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { gridState } from '../Grid';
import { AppConfig } from './api/grid/template';

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetcher<AppConfig>('/api/grid/template');
  return { props: data };
};

const IndexPage: NextPage<AppConfig> = ({ grid: data }) => {
  const [grid, setGridState] = useRecoilState(gridState);
  setGridState(data);

  if (!grid) return null;

  return (
    <>
      <Navbar />
      <Grid gridTemplateColumns="1fr">
        <BorderBox bg="bg.grayLight" padding={2}>
          <ControlStack entries="rows" />
          <ControlStack entries="columns" />
        </BorderBox>
      </Grid>
    </>
  );
};

const controlGroupStackState = selectorFamily<
  Entry[],
  keyof Pick<GridState, 'rows' | 'columns'>
>({
  key: 'templateEntriesState',
  get: (str: string) => ({ get }) => {
    const grid = get(gridState);
    const [key, index, property] = str.split('.');
    return grid[key];
  },
});

/**
 * An atom that stores which Element is currently selected.
 */
export const selectedControlsIdsState = atom({
  key: 'selectedControlsIdsState',
  default: [],
});

const ControlStack = ({ entries }) => {
  const [grid] = useRecoilState(gridState) as Entry[];
  const controls = grid[entries];
  return (
    <>
      <FormGroup>
        <FormGroup.Label fontWeight="bold" fontSize="16px">
          <Flex justifyContent="space-between" alignItems="center">
            <span>Grid Template {capitalize(entries)}</span>
            <ButtonOutline variant="small">
              <CircleOcticon icon={PlusIcon} size={20} />
            </ButtonOutline>
          </Flex>
        </FormGroup.Label>
      </FormGroup>

      <Box display="flex" flexDirection="column">
        {controls?.map((_, index) => {
          return (
            <ControlGroup
              key={`${entries}.${index}`}
              id={`${entries}.${index}`}
            />
          );
        })}
      </Box>
    </>
  );
};

/**
 * A selectorFamily that returns true if the provided
 * Element is currently selected.
 *
 * https://recoiljs.org/docs/api-reference/utils/selectorFamily
 */
export const isSelectedState = selectorFamily({
  key: 'isSelected',
  get: (id: string) => ({ get }) => {
    const selectedElementIds = get(selectedControlsIdsState);
    return selectedElementIds.includes(id);
  },
});

const controlGroupState = selectorFamily<Entry, string>({
  key: 'controlGroupState',
  get: (str) => ({ get }) => {
    const [key, index] = str.split('.');
    return get(gridState)?.[key]?.[Number(index)];
  },
});
const ControlGroup: FC<{ id: string }> = ({ id }) => {
  const control = useRecoilValue(controlGroupState(id));

  const [mouseDown, setMouseDown] = useState(false);
  const setSelectedControl = useSetRecoilState(selectedControlsIdsState);
  const isSelected = useRecoilValue(isSelectedState(id));

  const shiftKeyPressed = useShiftKeyPressed();
  return (
    <Box display="flex" padding={2} bg={isSelected ? 'blue' : 'bg.grayLight'}>
      <ControlGroupInput id={`${id}.amount`} {...control} />
    </Box>
  );
};
const controlGroupPropertyState = selectorFamily<string | number, string>({
  key: 'controlGroupPropertyState',
  get: (id) => ({ get }) => {
    const [key, index, property] = id.split('.');
    return get(gridState)?.[key]?.[Number(index)]?.[property];
  },
  set: (id) => ({ set, get }, newValue) => {
    const [key, index, property] = id.split('.');
    const stack = get(gridState)[key];

    return set(gridState, (prev) => ({
      ...prev,
      [key]: [
        ...stack.slice(0, Number(index)),
        { ...stack[index], [property]: newValue },
        [...stack.slice(Number(index + 1))],
      ],
    }));
  },
});

const ControlGroupInput = ({ id, amount }) => {
  const [key, index, property] = id.split('.');

  const setValue = useSetRecoilState(controlGroupPropertyState(id));
  const [grid, setGrid] = useRecoilState(gridState);
  const value = grid[key][index][property];
  return (
    <Box>
      <TextInput
        value={value}
        name={key}
        onChange={(event) => {
          setGrid((prev) => ({
            ...prev,
            [key]: [
              ...prev[key].slice(0, Number(index)),
              { ...prev[key][index], [property]: event.target.value },
              [...prev[key].slice(Number(index + 1))],
            ],
          }));
        }}
        type="number"
      />
    </Box>
  );
};

export default IndexPage;
