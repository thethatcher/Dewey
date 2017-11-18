import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Categories from "./pages/Categories";
import Items from "./pages/Items";


import Nav from "./components/Nav";

const App = () =>
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Categories} />
        <Route exact path="/Categories" component={Categories} />
        <Route exact path="/Categories/:id" component={Categories} />
        <Route exact path="/Items" component={Items} />
        <Route exact path="/Items/:id" component={Items} />
        
      </Switch>
    </div>
  </Router>;

export default App;