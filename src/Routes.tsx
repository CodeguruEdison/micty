import React from "react";
import "./Resources/css/app.css";
import IRoutes from "./models/IRoutes";
import { Layout } from "./Components/Hoc/Layout";
import { Switch } from "react-router-dom";
import { Home } from "./Components/Home";
import SignIn from "./Components/SignIn";
import DashBoard from "./Components/Admin/DashBoard";
import PrivateRoute from "./Components/authRoutes/privateRoute";
import PublicRoute from "./Components/authRoutes/publicRoutes";
import AdminMatches from "./Components/Admin/Matches/index";
import { AddEditMatch } from "./Components/Admin/Matches/addEditMatch";
import AdminPlayers from "./Components/Admin/players";
import AddEditPlayer from "./Components/Admin/players/addEditPlayer";

const Routes: React.FC<IRoutes> = props => {
  const { user } = props;
  //console.log("1");
  //console.log(user);
  //console.log("2");
  return (
    <Layout>
      <Switch>
        <PrivateRoute
          {...props}
          exact={true}
          component={AdminPlayers}
          path="/admin_players"
          redirectUrl="/sign_in"
        />
        <PrivateRoute
          {...props}
          exact={true}
          component={AddEditPlayer}
          path="/admin_players/edit_match"
          redirectUrl="/sign_in"
        ></PrivateRoute>
        <PrivateRoute
          {...props}
          exact={true}
          component={AddEditPlayer}
          path="/admin_players/edit_match/:id"
          redirectUrl="/sign_in"
        ></PrivateRoute>
        <PrivateRoute
          {...props}
          exact={true}
          component={AdminMatches}
          path="/admin_matches"
          redirectUrl="/sign_in"
        />
        <PrivateRoute
          {...props}
          exact={true}
          component={AddEditMatch}
          path="/admin_matches/edit_match"
          redirectUrl="/sign_in"
        />
        <PrivateRoute
          {...props}
          exact={true}
          component={AddEditMatch}
          path="/admin_matches/edit_match/:id"
          redirectUrl="/sign_in"
        />

        <PrivateRoute
          {...props}
          exact={true}
          component={DashBoard}
          path="/dashboard"
          redirectUrl="/sign_in"
        />

        <PublicRoute
          restricted={true}
          {...props}
          path="/sign_in"
          exact={true}
          component={SignIn}
        ></PublicRoute>
        <PublicRoute
          restricted={false}
          {...props}
          path="/"
          exact={true}
          component={Home}
        ></PublicRoute>
      </Switch>
    </Layout>
  );
};

export default Routes;
