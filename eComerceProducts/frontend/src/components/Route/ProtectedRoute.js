import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ children, isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading === false) {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    if (isAdmin === true && user.role !== "admin") {
      return <Navigate to="/login" />;
    }
  }


  return children;
};

export default ProtectedRoute;
/*
 <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to="/login" />;
            }

            if (isAdmin === true && user.role !== "admin") {
              return <Redirect to="/login" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
*/