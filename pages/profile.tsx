import { NextComponentType } from 'next';
import React from 'react';
import { Box, Flex, Heading, Image, Text } from 'rebass/styled-components';
import { useUser } from '@/store/auth';
import Container from '@/ui/Container';
import Navbar from '@/ui/Navbar';

const ProfilePage: NextComponentType<React.FC> = () => {
  const user = useUser();
  return (
    <React.Fragment>
      <Navbar title={user?.displayName} />
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
      </Container>
    </React.Fragment>
  );
};

export default ProfilePage;
