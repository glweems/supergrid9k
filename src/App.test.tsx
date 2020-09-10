import { render } from '@testing-library/react';
import React from 'react';
import ContextProvider from './components/ContextProvider';
import GridEditorControls, { GridTemplateControls } from './components/GridEditor/GridEditorControls';
import { useGridTemplate } from './store/grid';
import { renderHook, act } from '@testing-library/react-hooks';

test('renders Grid Gap', () => {
  const { getByText } = render(
    <ContextProvider>
      <GridEditorControls />
    </ContextProvider>
  );
  const gridTemplateColumns = getByText(/Grid Gap/i);
  expect(gridTemplateColumns).toBeDefined();
});
