import React, { ChangeEvent, FormEvent } from 'react';
import IFirebaseService from '../../services/IFirebaseService';

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

    return (
      <form onSubmit={this.handleLogin}>
        {errorStatus}
        <input type="email" value={email} onChange={this.handleEmailChange} />
        <input
          type="password"
          value={password}
          onChange={this.handlePasswordChange}
        />
        <input type="submit" value="submit" />
      </form>
    );
  }
}

export default AuthHome;
