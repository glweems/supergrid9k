import theme from '@lib/theme';
import { PlusIcon } from '@primer/octicons-react';
import arrayMove from 'array-move';
import { Entry } from 'css-grid-template-parser';
import { motion } from 'framer-motion';
import { capitalize } from 'lodash';
import React, { FC, memo, useState } from 'react';
import {
  SortableContainer,
  SortableContainerProps,
  SortEndHandler,
  SortStartHandler,
} from 'react-sortable-hoc';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { GridControlObjKey } from './GridControlId';
import GridControlProperties from './GridControlProperties';
import { gridControlsState, gridState } from './gridState';

type GridControlsProps = {
  id: GridControlObjKey;
};

const GridControls: FC<GridControlsProps> = ({ id }) => {
  const controls = useRecoilValue(gridControlsState(id));
  const setControls = useSetRecoilState(gridControlsState(id));
  const handleAdd = () => setControls(controls);
  const [grid, setGrid] = useRecoilState(gridState);
  const [activeDrag, setActiveDragIndex] = useState<number>();
  const onSortStart: SortStartHandler = ({ index }) => {
    console.log('activeDrag: ', activeDrag);
    setActiveDragIndex(index);
  };
  const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
    console.log('activeDrag: ', activeDrag);
    setActiveDragIndex(undefined);
    setGrid((prev) => ({
      ...prev,
      [id]: arrayMove(prev[id], oldIndex, newIndex),
    }));
  };
  return (
    <fieldset>
      <legend>
        <span>Grid Template {capitalize(id)}</span>
        <button
          className="btn-green fullwidth"
          style={{ marginTop: theme.space[3] }}
          onClick={handleAdd}
        >
          <PlusIcon /> {id}
        </button>
      </legend>
      <SortableList
        id={id}
        axis="y"
        lockAxis="y"
        hideSortableGhost={true}
        useDragHandle={true}
        items={grid?.[id]}
        updateBeforeSortStart={onSortStart}
        onSortEnd={onSortEnd}
        activeDrag={activeDrag}
        disabled={grid?.[id].length === 1}
      />
    </fieldset>
  );
};

type SortableListProps = {
  items: Entry[];
  id: GridControlObjKey;
  disabled: boolean;
  activeDrag: number;
} & SortableContainerProps;

const SortableList = SortableContainer(
  ({ id, items, disabled }: SortableListProps) => (
    <motion.ul>
      {items?.map((value, index) => (
        <GridControlProperties
          disabled={disabled}
          canDelete={disabled}
          id={`${id}.${index}`}
          key={`item-${id}-${index}`}
          index={index}
          {...value}
        />
      ))}
    </motion.ul>
  )
);

GridControls.displayName = 'GridControls';
export default memo(GridControls);
