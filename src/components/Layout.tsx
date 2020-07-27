import React from "react";
import Box from "../ui/Box";

const Layout: React.FC = ({ children }) => (
  <Box
    display="grid"
    gridTemplateColumns={"270px 1fr"}
    gridTemplateRows="100vh"
  >
    {children}
  </Box>
);

export default Layout;
