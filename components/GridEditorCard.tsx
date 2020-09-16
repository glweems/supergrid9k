import React from 'react';
import { Card, Heading, Image, Link } from 'rebass/styled-components';
import NextLink from 'next/link';
interface GridEditorCardProps {
  id: string;
}

const GridEditorCard = ({ id }: GridEditorCardProps) => {
  const url = `/api/tbn/${id}`;
  return (
    <Card>
      <Image src={url} />
      <Heading>
        <Link as={NextLink} href={`/grid/${id}`}>
          {url}
        </Link>
      </Heading>
    </Card>
  );
};

export default GridEditorCard;
