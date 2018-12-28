import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { PAGES } from './pages';
import App from '../components/app/app';
import HomePage from '../components/home-page/home-page';
import DetailsPage from '../components/details-page/details-page';
import Page404 from '../components/page404/page404';

const WrappedApp = (Component, props) => (
  <App >
    <Component { ...props } />
  </App>
);

export default () => (
  <Switch>
    <Route
      exact path={ PAGES.home.path }
      render={ props => WrappedApp(HomePage, props) }
    />
    <Route
      exact path={ PAGES.details.path }
      render={ props => WrappedApp(DetailsPage, props) }
    />
    <Route
      exact path={ PAGES.page404.path }
      render={ props => WrappedApp(Page404, props) }
    />
    <Route
      path = '/'
      render={ () => (
        <Redirect to={ PAGES.page404.path } />
      ) }
    />
  </Switch>
);
