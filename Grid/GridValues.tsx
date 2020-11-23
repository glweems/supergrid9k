import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import GridArea from './GridArea';
import { gridAreasArrayState, gridEntriesState } from './gridAreasState';
import { gridCssState } from './gridCssState';
import TemplateEntry from './TemplateEntry';
type GridAreasProps = { className?: string };
export const GridAreas: FC<GridAreasProps> = ({ className }) => {
  const gridCss = useRecoilValue(gridCssState);
  const areas = useRecoilValue(gridAreasArrayState);
  const entries = useRecoilValue(gridEntriesState);

  return (
    <motion.section
      className={className}
      style={{ display: 'grid', ...gridCss }}
    >
      {entries?.map(([row, column, gridArea], index) => {
        return (
          <TemplateEntry
            key={`[${row}].${column}`}
            row={row}
            column={column}
            index={index}
            gridArea={gridArea}
          />
        );
      })}
      {areas?.map((area, index) => (
        <GridArea key={`[${area}].${index}`} name={area} />
      ))}
    </motion.section>
  );
};
