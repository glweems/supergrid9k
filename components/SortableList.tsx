import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from './SortableItem';

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items?.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </ul>
  );
});
// SortableList.defaultProps = { useDragHandle: true };
export default SortableList;
