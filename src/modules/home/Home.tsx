import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography
} from '@material-ui/core';
import {
  AccountBox as AccountBoxIcon,
  AttachMoney as MoneyIcon,
  Check as CheckIcon,
  ExitToApp as SignOutIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  Notes as NoteIcon,
  PermIdentity as BlankPersonIcon,
  Person as PersonIcon,
  Settings as SettingsIcon
} from '@material-ui/icons';
import classNames from 'classnames';
import React, { Component } from 'react';
import IFirebaseService from '../../services/IFirebaseService';
import { MenuItem } from './components/MenuItem';
import styles from './Home.module.scss';
import Dashboard from './pages/Dashboard';

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
            <MenuItem
              text="Sign Out"
              icon={SignOutIcon}
              onClick={this.signOut}
            />
          </List>
        </Drawer>
        <Dashboard />
      </div>
    );
  }
}

export default Home;
