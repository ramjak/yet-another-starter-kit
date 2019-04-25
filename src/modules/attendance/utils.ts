import moment, { utc } from 'moment';
import IAttendance, { breakTimeInMs } from './models/IAttendance';

export function getFormattedDate(attendance: IAttendance) {
  return moment(attendance.firstIn).format('ddd, DD-MM-YYYY');
}

export function getTotalTime(attendance: IAttendance) {
  return attendance.lastOut - attendance.firstIn;
}

export function formatToHourMinutes(time: number) {
  return utc(time).format('HH:mm');
}

export function getWorkingTime(attendance: IAttendance) {
  return getTotalTime(attendance) - breakTimeInMs;
}

export function isWeekend(attendance: IAttendance) {
  const weekEndIndex = [0, 6];
  return weekEndIndex.includes(moment(attendance.firstIn).day());
}
