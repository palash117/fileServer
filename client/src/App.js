import React, { Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";
import MainContianer from "./component/maincontainer/MainContainer";
import Alert from "./component/alert/Alert";
import WaitContianer from "./component/waitcontainer/WaitContainer";
import store from "./Store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <Alert />
        <MainContianer />
        <WaitContianer />
      </Fragment>
    </Provider>
  );
}

export default App;
