import React from 'react';
import Base, { SelectProps } from 'react-dropdown-select';
import { Box, Image, Link } from 'rebass';
import styled from 'styled-components/macro';

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

interface Props {
  user: null | any;
}

const UserDropdown = ({ user }: Props) => {
  if (!user) return null;
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
      placeholder={user.tbn}
      dropdownHandle={false}
      onChange={() => undefined}
      name={user.username}
      searchable={false}
      options={[
        {
          label: 'Logout',
          path: '/api/auth/logout',
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
