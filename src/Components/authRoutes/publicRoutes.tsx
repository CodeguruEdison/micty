import React, { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
export interface IPublicRouteProps extends RouteProps {
  user: firebase.User | unknown;
  restricted: boolean;
  //redirectUrl: string;
}

const PublicRoute: FC<IPublicRouteProps> = props => {
  const { user, component: Comp, restricted, ...rest } = props;
  if (!Comp) return null;
  return (
    <Route
      {...rest}
      component={(props: any) =>
        restricted ? (
          user ? (
            <Redirect to="/dashboard"></Redirect>
          ) : (
            <Comp {...props} user={user} />
          )
        ) : (
          <Comp {...props} user={user} />
        )
      }
    />
  );
};

export default PublicRoute;
