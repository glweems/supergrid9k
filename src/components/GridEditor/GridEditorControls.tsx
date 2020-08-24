import React from "react";
import { Button } from "rebass/styled-components";
import { PlusIcon } from "../../lib/Icons";
import { GridStateName, GridTemplateEntry, useGridTemplate } from "../../state";
import { Control } from "../../ui/Control";
import { GridEditorControl } from "./GridEditorControl";

function GridEditorControls() {
  const rowData = useGridTemplate("gridTemplateRows");
  const columnData = useGridTemplate("gridTemplateColumns");
  const gapData = useGridTemplate("gridGap");
  return (
    <React.Fragment>
      <GridTemplateControls legend="Grid Rows" {...rowData} />
      <GridTemplateControls legend="Grid Columns" {...columnData} />
      <GridTemplateControls legend="Grid Gap" {...gapData} />
    </React.Fragment>
  );
}
interface GridTemplateControlProps {
  name: keyof GridStateName;
  addEntry: React.MouseEventHandler<HTMLButtonElement>;
  entries: GridTemplateEntry[];
  legend: string;
}

const GridTemplateControls: React.FC<GridTemplateControlProps> = ({
  name,
  entries,
  addEntry,
  legend,
}) => {
  return (
    <Control name={name}>
      <div className="elements">
        <legend className="control-label">{legend}</legend>

        {entries?.map((entry) => (
          <GridEditorControl key={entry.id} {...entry} name={name} />
        ))}

        {/* Button To Add New GridTemplate Entry */}
        {name !== "gridGap" && (
          <Button
            className="add-entry"
            onClick={addEntry}
            color="green"
            variant="outline"
          >
            <PlusIcon size={28} padding={0} />
          </Button>
        )}
      </div>
    </Control>
  );
};

export default GridEditorControls;
