import React from 'react';
import { RouteProps } from 'react-router';
import HomeSwitch from './containers/HomeSwitch';
import ServiceFactory from './services/ServiceFactory';

// tslint:disable-next-line variable-name
export const HomeRoute = {
  path: '/',
  render: () => <HomeSwitch firebase={ServiceFactory.getFirebaseService()} />
};

const routes: RouteProps[] = [HomeRoute];

export default routes;
