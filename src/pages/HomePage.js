import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
//--------------------------------------------------------------
import { Routes } from "../routes";
//--------------------------------------------------------------
// **Auth
import Signin from "./Auth/Signin";
import Signup from "./Auth/Signup";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import Lock from "./Auth/Lock";
import NotFoundPage from "./Auth/NotFound";
import ServerError from "./Auth/ServerError";
//--------------------------------------------------------------
//**Public pages*/
import Presentation from "./Presentation";
//** private pages */
import DashboardOverview from "./dashboard/DashboardOverview";
import Agency from "./Agency/Agency";
import Cars from "./Cars/Cars";
import SheetMain from "./Sheet/SheetMain";
import Settings from "./Settings";
//--------------------------------------------------------------
import Preloader from "../components/Preloader";
//--------------------------------------------------------------
const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {" "}
          <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
        </>
      )}
    />
  );
};
export default () => (
  <Switch>
    <RouteWithLoader
      exact
      path={Routes.Presentation.path}
      component={Presentation}
    />
    {/*Auth */}
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader
      exact
      path={Routes.ForgotPassword.path}
      component={ForgotPassword}
    />
    <RouteWithLoader
      exact
      path={Routes.ResetPassword.path}
      component={ResetPassword}
    />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />

    {/* pages */}
    <Route exact path={Routes.DashboardOverview.path}>
      <DashboardOverview />
    </Route>
    <Route exact path={Routes.Agencies.path}>
      <Agency />
    </Route>
    <Route exact path={Routes.Cars.path}>
      <Cars />
    </Route>
    <Route exact path={Routes.Sheet.path}>
      <SheetMain />
    </Route>
    <Route exact path={Routes.Settings.path}>
      <Settings />
    </Route>
    {/* Miss routing */}
    <RouteWithLoader
      exact
      path={Routes.NotFound.path}
      component={NotFoundPage}
    />
    <RouteWithLoader
      exact
      path={Routes.ServerError.path}
      component={ServerError}
    />
    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
