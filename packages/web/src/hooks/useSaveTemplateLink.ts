import React from "react";
import { useRecoilState } from "recoil";
import { useGridInstance } from "../lib/GridInstance";
import { grid } from "../state";

export default function useSaveTemplateLink() {
  const [gridState] = useRecoilState(grid);
  const [{ data, loading, error }, saveTemplate] = useGridInstance(
    { url: "/", method: "POST", data: gridState },
    { manual: true }
  );
  const handleClick: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (
    event
  ) => {
    saveTemplate().then((res) => console.debug(res));
  };

  return { data, loading, handleClick };
}
