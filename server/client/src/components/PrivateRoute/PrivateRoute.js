import React from "react";
import { Route, Redirect } from "react-router-dom";

// conponent
import Loading from "../Loading";
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={
      props => {
        // console.log("auth*", auth);
        switch (auth) {
          case null:
            return <Loading />;
          case false:
            return (
              <Redirect
                to={{
                  pathname: "/"
                }}
              />
            );
          default:
            return <Component auth={auth} {...props} />;
        }
      }

      // auth ? (
      //   <Component auth={auth} {...props} />
      // ) : (
      //   <Redirect
      //     to={{
      //       pathname: "/"
      //     }}
      //   />
      // )
    }
  />
);

export default PrivateRoute;
