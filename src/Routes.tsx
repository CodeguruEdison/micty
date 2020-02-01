import React from "react";
import './Resources/css/app.css';
import IRoutes from "./models/IRoutes";
import { Layout } from './Components/Hoc/Layout';
import {Switch,Route} from 'react-router-dom';
import { Home } from "./Components/Home";

const Routes: React.FC<IRoutes> = (props) => {
  return(
  <Layout>
    <Switch>
      <Route exact={true} component={Home}/>
    </Switch>
  </Layout>
  )
};

export default Routes;
