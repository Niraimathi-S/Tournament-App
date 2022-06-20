import React from "react";
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";


function PrivateRoute() {
  const { pathname } = useLocation();
  console.log("path", pathname);
  const routes = ["/dashboard", "/player"];
  const checkPrivateRoute = () => {
    let isPrivateRoute: boolean;
    if (routes.includes(pathname)) {
      isPrivateRoute = true;
    } else if(/\/player\/[\w]+/.test(pathname)) {
      isPrivateRoute = true
    } else {
      isPrivateRoute = false;  
    }
    return isPrivateRoute;
  }

  return (
    <>
      {localStorage.getItem("token") ? (
        checkPrivateRoute() ? (
          <Outlet />
        ) : (
          <Navigate to={"/dashboard"} replace={true} />
        )
      ) : !checkPrivateRoute() && pathname === "/" ? (
        <Outlet />
      ) : (
        <Navigate to={"/"} replace={true} />
      )}
    </>
  );
}

export default PrivateRoute;
