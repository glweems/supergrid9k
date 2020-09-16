import React from 'react';
import Base, { SelectProps } from 'react-dropdown-select';
import { Box, Image, Link } from 'rebass';
import styled from 'styled-components/macro';
import { useUser } from '../store/auth';

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
      direction="rtl"
      contentRenderer={({ props: { placeholder } }) => (
        <Box
          width="100px"
          css={`
            text-align: right;
            * {
              text-align: right;
            }
          `}
        >
          <Image src={placeholder} variant="avatar" height={26} width="auto" />
        </Box>
      )}
      values={[]}
      placeholder={user.photoURL}
      dropdownHandle={false}
      onChange={() => undefined}
      name={user.displayName}
      searchable={false}
      options={[
        {
          label: 'Logout',
          path: '/api/auth/logout',
        },
        {
          label: 'Profile',
          path: '/',
        },
      ]}
      itemRenderer={({ item }) => (
        <Box>
          <Link href={item.path}>{item.label}</Link>
        </Box>
      )}
    />
  );
};

export default UserDropdown;
