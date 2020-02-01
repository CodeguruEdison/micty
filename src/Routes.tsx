import React from "react";
import './Resources/css/app.css';
import IRoutes from "./models/IRoutes";
import { Layout } from './Components/Hoc/Layout';


const Routes: React.FC<IRoutes> = (props) => {
  return(
  <Layout>
    2nd line
  </Layout>
  )
};

export default Routes;
