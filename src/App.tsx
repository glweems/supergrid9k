import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import IndexPage from "./pages";
import CodePage from "./pages/code";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <IndexPage />
          </Route>
          <Route exact path="/code">
            <CodePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
