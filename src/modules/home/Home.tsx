import {
  AppBar,
  Avatar,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  Typography
} from '@material-ui/core';
import {
  AccountBox as AccountBoxIcon,
  AttachMoney as MoneyIcon,
  Cake as CakeIcon,
  Check as CheckIcon,
  CreditCard as CreditCardIcon,
  EditAttributes as EditAttributeIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  Notes as NoteIcon,
  PermIdentity as BlankPersonIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  TimerOff as TimerOffIcon
} from '@material-ui/icons';
import classNames from 'classnames';
import React, { Component } from 'react';
import IFirebaseService from '../../services/IFirebaseService';
import { MenuItem } from './components/MenuItem';
import styles from './Home.module.scss';

export interface IProps {
  firebase: IFirebaseService;
}

interface IState {
  isSidebarOpen: boolean;
}

class Home extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isSidebarOpen: true
    };

    this.signOut = this.signOut.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
  }

  private async signOut() {
    await this.props.firebase.signOut();
  }

  public handleDrawerOpen() {
    this.setState({ isSidebarOpen: true });
  }

  public handleDrawerClose() {
    this.setState({ isSidebarOpen: false });
  }

  public render() {
    // return <button onClick={this.signOut}>Sign Out</button={true}>;
    return (
      <div className={styles.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(
            styles.appBar,
            this.state.isSidebarOpen && styles.appBarShift
          )}
        >
          <Toolbar
            disableGutters={!this.state.isSidebarOpen}
            className={styles.toolbar}
          >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              className={classNames(
                styles.menuButton,
                this.state.isSidebarOpen && styles.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap={true}
              className={styles.title}
            />
            <IconButton color="inherit">
              <PersonIcon />
            </IconButton>
            <IconButton color="inherit">
              <AccountBoxIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              styles.drawerPaper,
              !this.state.isSidebarOpen && styles.drawerPaperClose
            )
          }}
          open={this.state.isSidebarOpen}
        >
          <div className={styles.toolbarIcon}>
            <h4 style={{ textAlign: 'center', fontWeight: 'normal' }}>Menu</h4>
          </div>
          <Divider />
          <List>
            <MenuItem icon={HomeIcon} text="Home" />
            <MenuItem icon={PersonIcon} text="Employee Management" />
            <MenuItem icon={BlankPersonIcon} text="Recruitment" />
            <MenuItem icon={MoneyIcon} text="Payroll" />
            <MenuItem icon={CheckIcon} text="Attendance" />
            <MenuItem icon={NoteIcon} text="Report" />
            <MenuItem icon={SettingsIcon} text="Settings" />
          </List>
        </Drawer>
        <main className={styles.content}>
          <div className={styles.contentInner}>
            <Paper className={styles.root}>
              <Table className={styles.table}>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <TimerOffIcon className={styles.tableIcon} /> Pending
                      Leave Approval
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
                      <CakeIcon className={styles.tableIcon} /> Upcoming
                      Birthday
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
                      <CreditCardIcon className={styles.tableIcon} /> Expiry
                      Alert
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
            <br />
            <br />
            <Button type="button" onClick={this.signOut} color="primary">
              Sign Out
            </Button>
          </div>
        </main>
      </div>
    );
  }
}

export default Home;
