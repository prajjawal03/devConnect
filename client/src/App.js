import React, { useEffect } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Error from "./components/layout/Error";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./routing/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import CreateProfile from "./components/profile-forms/CreateProfile";
import Dashboard from "./components/dashboard/Dashboard";
import { loadUser } from "./actions/auth";
import store from "./store";
import "./App.css";

function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <div className="container">
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route exact path="/createprofile" component={CreateProfile} />
          <Route component={Error} />
        </Switch>
      </div>
    </>
  );
}

export default App;
