import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Courses from "container/Courses/Courses";
import Files from "container/Files/Files";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className='App'>
      <Header />
      <Router>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/courses' />
          </Route>
          <Route path='/courses' exact component={Courses} />
          <Route path='/courses/:id/files' exact component={Files} />
        </Switch>
      </Router>
      <ToastContainer position='bottom-right' autoClose={3000} />
    </div>
  );
};

export default App;
