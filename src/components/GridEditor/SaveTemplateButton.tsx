import React from "react";
import { Button } from "rebass/styled-components";
import useSaveTemplateLink from "../../hooks/useSaveTemplateLink";

export default function SaveTemplateButton() {
  const { data, loading, handleClick } = useSaveTemplateLink();
  return (
    <>
      <Button onClick={handleClick}>Save Grid</Button>
      {JSON.stringify(data, null, 2)}
      {String(loading)}
    </>
  );
}
