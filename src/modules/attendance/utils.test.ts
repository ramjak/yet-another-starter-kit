import IAttendance, { breakTimeInMs } from './models/IAttendance';
import * as utils from './utils';

const sampleAttendance: IAttendance = {
  checkIn: {
    coordinateE: 213,
    coordinateN: 123,
    name: 'test',
    time: 123
  },
  checkOut: {
    coordinateE: 213,
    coordinateN: 123,
    name: 'test',
    time: 123
  },
  firstIn: 2000000,
  lastOut: 6800000
};

it('should format attendance date', () => {
  const mockAttendance = Object.assign({}, sampleAttendance);
  const formattedDate = utils.getFormattedDate(mockAttendance);

  expect(formattedDate).toBe('Thu, 01-01-1970');
});

it('should be calculate total time', () => {
  const mockAttendance = Object.assign({}, sampleAttendance);
  const totalTime = utils.getTotalTime(mockAttendance);

  expect(totalTime).toBe(4800000);
  expect(sampleAttendance).toEqual(mockAttendance);
});

it('should convert time to correct format', () => {
  const time = 3720000;
  const formattedTime = utils.formatToHourMinutes(time);

  expect(formattedTime).toBe('01:02');
});

it('should get working time', () => {
  const mockAttendance = Object.assign({}, sampleAttendance);
  const expectedWorkingTime = 4800000 - breakTimeInMs;
  const workingTime = utils.getWorkingTime(mockAttendance);

  expect(workingTime).toBe(expectedWorkingTime);
  expect(sampleAttendance).toEqual(mockAttendance);
});

it('should know if the day is weekend', () => {
  const mockAttendance = Object.assign({}, sampleAttendance);
  const shouldNotWeekend = utils.isWeekend(mockAttendance);

  const weekendAttendance = {
    ...mockAttendance,
    firstIn: 1555729657866,
    lastOut: 1555749657866
  };
  const shouldWeekend = utils.isWeekend(weekendAttendance);

  expect(shouldNotWeekend).toBe(false);
  expect(shouldWeekend).toBe(true);
  expect(sampleAttendance).toEqual(mockAttendance);
});
