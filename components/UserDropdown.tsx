import Box from '@ui/Box';
import Link from '@ui/Link';
import React from 'react';
import Base, { SelectProps } from 'react-dropdown-select';
import { Image } from 'rebass';
import { Flex } from 'rebass/styled-components';
import styled from 'styled-components/macro';
import { useUser } from '../lib/User';

const BaseSelect = (props: SelectProps<{ label: string; path: string }>) => (
  <Base<{ label: string; path: string }> {...props} />
);

const Select = styled(BaseSelect)`
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  &:focus {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
  }
`;

const UserDropdown = () => {
  const user = useUser();
  return (
    <Select
      contentRenderer={({ props: { placeholder } }) => (
        <Flex>
          <Box marginRight={2}>{user?.displayName}</Box>
          <Image src={placeholder} variant="avatar" height={26} width="auto" />
        </Flex>
      )}
      values={[]}
      placeholder={user?.photoURL}
      dropdownHandle={false}
      onChange={() => undefined}
      name={user.displayName}
      searchable={false}
      options={[
        {
          label: 'Logout',
          path: '/logout',
        },
        {
          label: 'Profile',
          path: '/profile',
        },
      ]}
      itemRenderer={({ item }) => (
        <Box border={1}>
          <Link href={item.path}>{item.label}</Link>
        </Box>
      )}
    />
  );
};

export default UserDropdown;
