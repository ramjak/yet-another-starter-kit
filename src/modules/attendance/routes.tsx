import React from 'react';
import { RouteProps } from 'react-router';
import Attendance from './Attendance';

// tslint:disable-next-line variable-name
export const AttendanceRoute = {
  path: '/attendance',
  render: () => <Attendance />
};

const routes: RouteProps[] = [AttendanceRoute];

export default routes;
