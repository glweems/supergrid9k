import Container from '@ui/Container';
import Navbar from '@ui/Navbar';
import { Tiles } from '@rebass/layout';
import { NextComponentType } from 'next';
import React from 'react';
import { Box, Flex, Heading, Image, Text } from 'rebass/styled-components';
import useSWR from 'swr';
import GridEditorCard from '@components/GridEditorCard';
import { useUser } from '../lib/User';
import { GridState } from '../css-grid-template-parser/GridState';

const ProfilePage: NextComponentType<React.FC> = () => {
  const user = useUser();
  const { data } = useSWR<GridState[]>(`/api/grid?owner=${user?.id}`);

  return (
    <React.Fragment>
      <Navbar />
      <Container padding={3}>
        <Flex>
          <Box marginRight={3}>
            <Image src={user?.photoURL} variant="avatar" />
          </Box>
          <Box>
            <Heading>{user?.displayName}</Heading>
            <Text>{user?.email}</Text>
          </Box>
        </Flex>
        <Tiles columns={[2, null, 4]}>
          {data?.map((_, i) => (
            <GridEditorCard key={i} id={`${i}`} />
          ))}
        </Tiles>
      </Container>
    </React.Fragment>
  );
};

export default ProfilePage;
