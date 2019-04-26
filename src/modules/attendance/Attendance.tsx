import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import moment from 'moment';
import * as React from 'react';
import { withDependency } from '../../services/DependencyContext';
import IFirebaseService, { IMap } from '../../services/IFirebaseService';
import IAttendance, { ICheckPoint } from './models/IAttendance';
import {
  formatToHourMinutes,
  getFormattedDate,
  getTotalTime,
  getWorkingTime,
  isWeekend
} from './utils';

interface IProps {
  firebase?: IFirebaseService;
}

interface IState {
  attendances: IMap<IAttendance>;
  highlightedAttendance: IAttendance | null;
  highlightedCheckPointImageUrl: string;
}

export class Attendance extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      attendances: {},
      highlightedAttendance: null,
      highlightedCheckPointImageUrl: ''
    };
  }

  private onAttendanceClick(attendance: IAttendance) {
    this.setState({
      highlightedAttendance: attendance,
      highlightedCheckPointImageUrl: ''
    });
  }

  private highlightCheckoutLocation(checkPoint: ICheckPoint) {
    const mapBoxImg = `https://api.mapbox.com/styles/v1/mapbox/light-v9/static/pin-m+ff0000(${
      checkPoint.coordinateE
    },${checkPoint.coordinateN})/${checkPoint.coordinateE},${
      checkPoint.coordinateN
    }
    ,15,0,0/300x200?access_token=pk.eyJ1IjoiZmhhYmliaWUiLCJhIjoiY2pyNzd0ZWRuMmVrMzN5b3g2aXl2bW4xYiJ9.-L4Niudai9Z8ipJ8SdR5uw`;
    this.setState({ highlightedCheckPointImageUrl: mapBoxImg });
  }

  public componentDidMount(): void {
    const { firebase } = this.props;
    firebase &&
      firebase.addAttendanceListener(snapshot => {
        const attendanceList = snapshot && snapshot.val();
        this.setState({ attendances: attendanceList || {} });
      });
  }

  public render() {
    const { attendances, highlightedAttendance } = this.state;
    const { highlightedCheckPointImageUrl } = this.state;
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>First In</TableCell>
              <TableCell>Last Out</TableCell>
              <TableCell>Total Hours</TableCell>
              <TableCell>Working Hours</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(attendances).map(key => (
              <TableRow
                key={key}
                onClick={this.onAttendanceClick.bind(this, attendances[key])}
              >
                <TableCell>{getFormattedDate(attendances[key])}</TableCell>
                <TableCell>
                  {formatToHourMinutes(attendances[key].firstIn)}
                </TableCell>
                <TableCell>
                  {formatToHourMinutes(attendances[key].lastOut)}
                </TableCell>
                <TableCell>
                  {formatToHourMinutes(getTotalTime(attendances[key]))}
                </TableCell>
                <TableCell>
                  {formatToHourMinutes(getWorkingTime(attendances[key]))}
                </TableCell>
                <TableCell>
                  {isWeekend(attendances[key]) ? 'Weekend' : 'Present'}
                </TableCell>
              </TableRow>
            )) || (
              <TableRow>
                <TableCell colSpan={6}>No Data</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <br />
        <br />
        {highlightedAttendance && (
          <div style={{ padding: 20 }}>
            <h4>
              {moment(highlightedAttendance.firstIn).format('ddd, DD-MM-YYYY')}
            </h4>
            {highlightedCheckPointImageUrl && (
              <div>
                <img
                  src={highlightedCheckPointImageUrl}
                  alt={`locationImageUrl: ${highlightedCheckPointImageUrl}`}
                />
                <br />
                <br />
              </div>
            )}
            <div style={{ float: 'left' }}>
              <div>Check-in:</div>
              <p>{formatToHourMinutes(highlightedAttendance.checkIn.time)}</p>
              <p>{highlightedAttendance.checkIn.name}</p>
              <Button
                onClick={this.highlightCheckoutLocation.bind(
                  this,
                  highlightedAttendance.checkIn
                )}
              >
                View Check-in Location
              </Button>
            </div>
            <div style={{ float: 'right' }}>
              <div>Check-out:</div>
              <p>{formatToHourMinutes(highlightedAttendance.checkOut.time)}</p>
              <p>{highlightedAttendance.checkOut.name}</p>
              <Button
                onClick={this.highlightCheckoutLocation.bind(
                  this,
                  highlightedAttendance.checkOut
                )}
              >
                View Check-out Location
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withDependency(Attendance, factory => ({
  firebase: factory.getFirebaseService()
}));
