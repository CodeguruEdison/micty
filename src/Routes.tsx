import React from "react";
import "./Resources/css/app.css";
import IRoutes from "./models/IRoutes";
import { Layout } from "./Components/Hoc/Layout";
import { Switch, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import SignIn from "./Components/SignIn";
import DashBoard from "./Components/Admin/DashBoard";

const Routes: React.FC<IRoutes> = props => {
  return (
    <Layout>
      <Switch>
        <Route exact={true} component={DashBoard} path="/dashboard" />
        <Route exact={true} component={SignIn} path="/sign_in" />
        <Route exact={true} component={Home} path="/" />
      </Switch>
    </Layout>
  );
};

export default Routes;
