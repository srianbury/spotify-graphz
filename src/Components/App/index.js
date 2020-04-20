import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from '../Home';
import Login from '../Login';
import Callback from '../Callback';
import withAuthentication from '../Authentication';
import withAuthorization from '../Authorization';
import Playlist from '../Playlist';
import Navbar from '../Navbar';
import Profile from '../Profile';
import Example from '../Example';
import withInit from '../Init';
import { ROUTES } from '../../Constants';
import withErrorBoundary, {
  EntireAppCatcher,
} from '../ErrorBoundary';

const AppContainer = () => (
  <Router>
    <App />
  </Router>
);

const AppView = () => (
  <>
    <Navbar />
    <Pages />
  </>
);
const App = withErrorBoundary(AppView, EntireAppCatcher);

const PagesBase = () => (
  <Switch>
    <Route exact path={ROUTES.HOME} component={Home} />
    <Route path={ROUTES.CALLBACK} component={Callback} />
    <Route path={ROUTES.LOGIN} component={Login} />
    <Route path={ROUTES.EXAMPLE} component={Example} />
    <Route
      path={`${ROUTES.PLAYLIST}/:id`}
      component={withAuthorization(Playlist)}
    />
    <Route
      path={ROUTES.PROFILE}
      component={withAuthorization(Profile)}
    />
  </Switch>
);
const Init = () => <div></div>;
const Pages = withInit(PagesBase, Init);

export default withAuthentication(AppContainer);
