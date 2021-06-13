import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import routes from './protectesRoutesPaths';

export default function adminRoutes() {
  return (
    <Router basename={process.env.REACT_APP_BASENAME || ''}>
      <div>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={() => {
                return (
                  <route.layout>
                    <route.component />
                  </route.layout>
                );
              }}
            />
          );
        })}
      </div>
    </Router>
  );
}
