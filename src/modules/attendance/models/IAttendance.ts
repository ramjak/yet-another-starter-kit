export const attendanceKey = 'Attendance';
const anHourInMs = 3600000;
export const breakTimeInMs = anHourInMs;

export interface ICheckPoint {
  coordinateE: number;
  coordinateN: number;
  name: string;
  time: number;
}

export default interface IAttendance {
  checkIn: ICheckPoint;
  checkOut: ICheckPoint;
  firstIn: number;
  lastOut: number;
}
