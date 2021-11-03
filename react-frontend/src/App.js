import React, { useState } from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Questionnaire from "./pages/Questionnaire";

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage loading={loading} setLoading={setLoading}/>
          </Route>
          <Route path="/questionnaire">
            <Questionnaire loading={loading} setLoading={setLoading} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
