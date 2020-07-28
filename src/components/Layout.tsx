import React from "react";
import { useRecoilState } from "recoil";
import { grid } from "../store/grid";
import Box from "../ui/Box";

const Layout: React.FC = ({ children }) => {
  const [gridState] = useRecoilState(grid);

  return (
    <React.Fragment>
      <pre>
        <code>{JSON.stringify(gridState, null, 2)}</code>
      </pre>
      <Box
        display="grid"
        gridTemplateColumns={"270px 1fr"}
        gridTemplateRows="100vh"
      >
        {children}
      </Box>
    </React.Fragment>
  );
};

export default Layout;
