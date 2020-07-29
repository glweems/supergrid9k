import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import IndexPage from "./pages";
import AboutPage from "./pages/about";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
              <IndexPage />
          </Route>

          <Route exact path="/about">
            <AboutPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
