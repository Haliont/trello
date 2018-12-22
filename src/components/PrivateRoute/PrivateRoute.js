import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ({
  isSignedIn, path, component: Component, ...rest
}) {
  return (
    <Route
      {...rest}
      path={path}
      render={props => (isSignedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      ))}
    />
  );
}
