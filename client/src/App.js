import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Categories from "./pages/Categories";


import Nav from "./components/Nav";

const App = () =>
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Categories} />
        <Route exact path="/Categories" component={Categories} />
        <Route exact path="/Categories/:id" component={Categories} />
        
      </Switch>
    </div>
  </Router>;

export default App;