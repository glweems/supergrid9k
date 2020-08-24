import React from "react";
import { Button } from "rebass/styled-components";
import { useRecoilState } from "recoil";
import { useGridInstance } from "../../lib/GridInstance";
import { grid } from "../../state";

export default function SaveTemplateButton() {
  const [gridState] = useRecoilState(grid);
  const [{ data, loading, error }, saveTemplate] = useGridInstance(
    { url: "/", method: "POST", data: gridState },
    { manual: true }
  );
  const handleClick: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (
    event
  ) => {
    saveTemplate();
  };
  return (
    <>
      <Button onClick={handleClick}>Save Grid</Button>
      {JSON.stringify(data, null, 2)}
      {String(loading)}
    </>
  );
}
