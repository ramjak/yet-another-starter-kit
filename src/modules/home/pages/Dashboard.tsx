import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core';
import {
  AccountBox as AccountBoxIcon,
  Cake as CakeIcon,
  CreditCard as CreditCardIcon,
  EditAttributes as EditAttributeIcon,
  PermIdentity as BlankPersonIcon,
  TimerOff as TimerOffIcon
} from '@material-ui/icons';
import * as React from 'react';
import styles from '../Home.module.scss';

interface IProps {}

interface IState {}

class Dashboard extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <main className={styles.content}>
        <div className={styles.contentInner}>
          <Paper className={styles.root}>
            <Table className={styles.table}>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <TimerOffIcon className={styles.tableIcon} /> Pending Leave
                    Approval
                  </TableCell>
                  <TableCell
                    align="right"
                    padding="none"
                    className={styles.tableCell}
                  >
                    <Avatar className={styles.countAvatar}>0</Avatar>
                  </TableCell>
                  <TableCell>
                    <AccountBoxIcon className={styles.tableIcon} /> Documents
                    Not Submitted
                  </TableCell>
                  <TableCell align="right" className={styles.tableCell}>
                    <Avatar className={styles.countAvatar}>0</Avatar>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <CakeIcon className={styles.tableIcon} /> Upcoming Birthday
                  </TableCell>
                  <TableCell
                    align="right"
                    padding="none"
                    className={styles.tableCell}
                  >
                    <Avatar className={styles.countAvatar}>0</Avatar>
                  </TableCell>
                  <TableCell>
                    <BlankPersonIcon className={styles.tableIcon} /> Job
                    Openings
                  </TableCell>
                  <TableCell align="right" className={styles.tableCell}>
                    <Avatar className={styles.countAvatar}>0</Avatar>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <CreditCardIcon className={styles.tableIcon} /> Expiry Alert
                  </TableCell>
                  <TableCell
                    align="right"
                    padding="none"
                    className={styles.tableCell}
                  >
                    <Avatar className={styles.countAvatar}>0</Avatar>
                  </TableCell>
                  <TableCell>
                    <EditAttributeIcon className={styles.tableIcon} />{' '}
                    Attendance Not Marked
                  </TableCell>
                  <TableCell align="right" className={styles.tableCell}>
                    <Avatar className={styles.countAvatar}>0</Avatar>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </div>
      </main>
    );
  }
}

export default Dashboard;
