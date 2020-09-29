import Box, { BoxProps } from '@/ui/Box';
import {
  entriesArrayParser,
  makeGridAreas,
  RawGridState,
  template,
} from 'css-grid-template-parser';
import React from 'react';
import styled from 'styled-components/macro';
import useSWR from 'swr';

interface GridAreasProps extends BoxProps {
  endpoint: string;
  initialData: RawGridState;
}
const GridAreas: React.FC<GridAreasProps> = ({
  endpoint,
  initialData,
  ...boxProps
}) => {
  const { data, error } = useSWR<RawGridState, RawGridState>(endpoint, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
    refreshInterval: 0,
    initialData,
  });

  const [areasState, setAreasState] = React.useState(makeGridAreas(data));

  const gridTemplateAreas = template({
    width: entriesArrayParser(data['gridTemplateRows']).length,
    height: entriesArrayParser(data['gridTemplateColumns']).length,
    areas: data.areas,
  });

  if (error) return <div>error</div>;

  return (
    <GridProperties {...boxProps}>
      {areasState?.map((area, index) => (
        <Box
          key={'item' + index}
          bg="primary"
          height="100%"
          width="100%"
          style={area.style}
        >
          {area?.name}
        </Box>
      ))}
    </GridProperties>
  );
};
const GridProperties = styled(Box)`
  display: grid;
  grid-area: grid;
  height: ${({ theme }) => `calc(100vh - ${theme.navbarHeight})`};
`;

export default GridAreas;
