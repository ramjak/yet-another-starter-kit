import React from 'react';
import { RouteProps } from 'react-router';
import attendanceRoutes from '../attendance/routes';
import Dashboard from './pages/Dashboard';

// tslint:disable-next-line variable-name
export const HomeRoute = {
  exact: true,
  path: '/',
  render: () => <Dashboard />
};

const routes: RouteProps[] = [HomeRoute, ...attendanceRoutes];

export default routes;
