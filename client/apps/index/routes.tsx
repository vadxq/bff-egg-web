import React, { lazy, Suspense } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Loading from '../../components/Loading';
// import History from './utils/history';
import Notfound from './pages/notFound';

const ROUTE_CONFIG = [
  {
    path: '/',
    component: lazy(() =>
      import(/* webpackChunkName: 'index/home' */ './pages')
    ),
  },
];

export const getRoutes = () => {
  const loadedRoutes = ROUTE_CONFIG.map(({ path, component }) => {
    return <Route path={path} component={component} key={path} />;
  });

  return (
    <Router history={History}>
      <Suspense fallback={<Loading />}>
        <Switch>
          {loadedRoutes}
          <Route component={Notfound} />
        </Switch>
      </Suspense>
    </Router>
  );
};
