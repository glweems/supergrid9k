import React from "react";
import GridEditor from "./components/GridEditor";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <GridEditor />
      </Layout>
    </div>
  );
}

export default App;
