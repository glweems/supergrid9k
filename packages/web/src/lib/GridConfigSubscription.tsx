import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import { grid, GridState } from "../state";
import { useGridInstance } from "./GridInstance";
import { defaultGridState } from "./utils";

interface DataKey<T> {
  data: T;
}

export default function GridConfigSubscription() {
  const [, setGridState] = useRecoilState(grid);

  const { query } = useRouter();
  const [{ data, loading, error }] = useGridInstance<GridState>(
    `/${query.grid}`,
    {
      manual: typeof query?.grid !== "string",
    }
  );
  React.useEffect(() => {
    console.log("data: ", data);

    if (!loading && data && !error) {
      setGridState({ ...data, initialState: data });
    } else {
      setGridState(defaultGridState);
    }
  }, [data, error, loading, setGridState]);

  return null;
}
