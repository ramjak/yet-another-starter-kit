import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Paper,
  Typography
} from '@material-ui/core';
import { AccountBox, Lock } from '@material-ui/icons';
import React, { ChangeEvent, FormEvent } from 'react';
import IFirebaseService from '../../services/IFirebaseService';
import styles from './AuthHome.module.scss';

export interface IProps {
  firebase: IFirebaseService;
}

interface IState {
  email: string;
  errorStatus: string;
  password: string;
}

class AuthHome extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: '',
      errorStatus: '',
      password: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  private async handleLogin(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const { email, password } = this.state;
    try {
      await this.props.firebase.signIn(email, password);
    } catch (e) {
      this.setState({ errorStatus: e.message });
    }
  }

  private handleEmailChange(ev: ChangeEvent<HTMLInputElement>) {
    this.setState({ email: ev.target.value });
  }

  private handlePasswordChange(ev: ChangeEvent<HTMLInputElement>) {
    this.setState({ password: ev.target.value });
  }

  public render() {
    const { password, errorStatus, email } = this.state;

    // noinspection HtmlDeprecatedAttribute
    return (
      <div className={styles.authPage}>
        <div className={styles.authSpacer}>
          <Paper className={styles.authBox}>
            <Typography component="h1" variant="h5" align="center">
              Sample App
            </Typography>
            <form onSubmit={this.handleLogin}>
              {errorStatus}
              <Grid container={true} spacing={32} alignItems="flex-end">
                <Grid item={true} xs={1}>
                  <AccountBox />
                </Grid>
                <Grid item={true} xs={true}>
                  <FormControl margin="normal" required={true} fullWidth={true}>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input
                      id="email"
                      name="email"
                      autoComplete="email"
                      autoFocus={true}
                      value={email}
                      onChange={this.handleEmailChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container={true} spacing={32} alignItems="flex-end">
                <Grid item={true} xs={1}>
                  <Lock />
                </Grid>
                <Grid item={true} xs={true}>
                  <FormControl margin="normal" required={true} fullWidth={true}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      name="password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={this.handlePasswordChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <br />
              <br />
              <br />
              <Button
                type="submit"
                fullWidth={true}
                variant="contained"
                color="primary"
                // className={}
              >
                Login
              </Button>
              <br />
              <div className={styles.forgotPassBox}>
                <a href="#">Forgot Password?</a>
              </div>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

export default AuthHome;
