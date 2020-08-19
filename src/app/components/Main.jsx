import React from "react";
import { ConnectedDashboard } from "./Dashboard";
import { Router, Route } from "react-router-dom";
import { history } from "../redux/history";
import { ConnectedNavigation } from "./Navigation";
import { ConnectedTaskDetail } from "./TaskDetail";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../redux/configureStore";
import { Redirect } from "react-router-dom";
import { ConnectedLogin } from "./Login";

const RouteGuard = (Component) => ({ match }) => {
  console.info("Route Guard", match);
  if (!store.getState().session.authenticated) {
    return <Redirect to="/" />;
  }
  {
    return <Component match={match} />;
  }
};
function Main() {
  return (
    <Router history={history}>
      <ReduxProvider store={store}>
        <div>
          <ConnectedNavigation />
          <Route exact path="/" component={ConnectedLogin} />
          <Route path="/dashboard" render={RouteGuard(ConnectedDashboard)} />
          <Route path="/task/:id" render={RouteGuard(ConnectedTaskDetail)} />
        </div>
      </ReduxProvider>
    </Router>
  );
}

export default Main;
