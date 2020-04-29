import React from "react";

import "./App.css";
import "formiojs/dist/formio.full.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Form from "./form";
import Submissions from "./submissions";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/submissions">
          <Submissions/>
        </Route>
        <Route path="/">
          <Form />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
