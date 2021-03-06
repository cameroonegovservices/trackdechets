import { Route, Redirect, RouteProps } from "react-router";
import React from "react";
import { localAuthService } from "./auth.service";
interface IProps {
  component: React.ComponentType<any>;
}

export default function PrivateRoute({
  component: Component,
  ...rest
}: IProps & RouteProps): any {
  return (
    <Route
      {...rest}
      render={props =>
        localAuthService.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
