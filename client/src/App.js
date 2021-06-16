import React, { Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";
import MainContianer from "./component/maincontainer/MainContainer";
import Alert from "./component/alert/Alert";
import WaitContianer from "./component/waitcontainer/WaitContainer";
import store from "./Store";
import { Provider } from "react-redux";
import FolderContainer from "./component/folderContainer/FolderContainer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomeView from "./view/HomeVeiw";
import FolderView from "./view/FolderView";

function App() {
  return (
    <Provider store={store}>
      <Router >
      <Switch>
        <Route path="/" exact="true">
          <HomeView />
        </Route>
        <Route path="/folder/:id">
          <FolderView />
        </Route>
      </Switch>
        <Alert></Alert>
        <WaitContianer></WaitContianer>
      </Router>
    </Provider>
  );
}

export default App;
