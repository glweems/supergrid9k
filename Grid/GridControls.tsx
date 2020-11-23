import theme from '@lib/theme';
import { PlusIcon } from '@primer/octicons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { capitalize } from 'lodash';
import React, { FC, memo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { GridControlObjKey } from './GridControlId';
import GridControlProperties from './GridControlProperties';
import { gridControlsState } from './gridState';

type GridControlsProps = {
  id: GridControlObjKey;
};

const GridControls: FC<GridControlsProps> = ({ id }) => {
  const controls = useRecoilValue(gridControlsState(id));
  const setControls = useSetRecoilState(gridControlsState(id));
  const handleAdd = () => setControls(controls);
  return (
    <GridControlStyles>
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
      <AnimatePresence>
        {controls?.map((_control, index) => (
          <motion.div
            key={`${id}.${index}`}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <GridControlProperties
              id={`${id as GridControlObjKey}.${index as number}`}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </GridControlStyles>
  );
};

const GridControlStyles = styled.fieldset``;
GridControls.displayName = 'GridControls';
export default memo(GridControls);
