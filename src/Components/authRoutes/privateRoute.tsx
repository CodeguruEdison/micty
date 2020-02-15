import React, { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
export interface IPrivateRouteProps extends RouteProps {
  user: firebase.User | null;
  redirectUrl: string;
}

const PrivateRoutes: FC<IPrivateRouteProps> = props => {
  const { user, component: Comp, redirectUrl, ...rest } = props;
  if (!Comp) return null;
  return (
    <Route
      {...rest}
      component={(props: any) =>
        user ? <Comp {...props} user={user} /> : <Redirect to={redirectUrl} />
      }
    />
  );
};

export default PrivateRoutes;
