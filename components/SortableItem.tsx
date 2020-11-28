import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement(({ value }) => (
  <li tabIndex={0}>{JSON.stringify(value)}</li>
));

export default SortableItem;
