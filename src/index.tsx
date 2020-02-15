import React, { FC } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./Routes";
import { firebaseAuth } from "./firebase";

//import './firebase';
//import * as serviceWorker from './serviceWorker';
export interface IAppProps {
  user: firebase.User | null;
}

const App: FC<IAppProps> = props => {
  //const { user } = props;
  return (
    <Router>
      <Routes {...props}></Routes>
    </Router>
  );
};
firebaseAuth.onAuthStateChanged(user => {
  ReactDOM.render(<App user={user} />, document.getElementById("root"));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
