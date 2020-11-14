import { Button, ButtonGroup } from '@primer/components';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

interface TabsProps {
  tabs: Record<string, React.ReactNode>;
  initialTab?: keyof TabsProps['tabs'];
}

const Tabs: FC<TabsProps> = ({ initialTab, tabs }) => {
  const router = useRouter();
  const [state, setState] = React.useState<keyof TabsProps['tabs']>(
    (router?.query?.tab as string) ?? initialTab ?? Object.keys(tabs)[0]
  );
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setState(event.currentTarget.name);
    router.push({
      pathname: '/',
      query: { tab: event.currentTarget.name },
    });
  };
  return (
    <React.Fragment>
      <ButtonGroup display="flex">
        {Object.keys(tabs).map((str) => (
          <Button
            key={str}
            name={str}
            onClick={handleClick}
            style={{ flex: 1 }}
          >
            {capitalize(str)}
          </Button>
        ))}
      </ButtonGroup>
      {tabs?.[state]}
    </React.Fragment>
  );
};

export default Tabs;
