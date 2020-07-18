import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Courses from "container/Courses/Courses";
import Files from "container/Files/Files";

const App = () => {
  return (
    <div className='App'>
      <Header />
      <Router>
        <Switch>
          <Route path='/' exact>
            <Courses />
          </Route>
          <Route path='/files' exact>
            <Files />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
