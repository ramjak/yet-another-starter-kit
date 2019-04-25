import React from 'react';
import { RouteProps } from 'react-router';

// tslint:disable-next-line variable-name
export const HomeRoute = {
  path: '/',
  render: () => <div />
};

const routes: RouteProps[] = [HomeRoute];

export default routes;
