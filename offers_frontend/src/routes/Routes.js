import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import routes from './routesPaths';

export default function adminRoutes(props) {
  console.log('🔥dddsd🚀', props.auth);

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
