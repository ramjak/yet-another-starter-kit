import { User } from 'firebase';
import * as React from 'react';
import AuthHome from '../modules/auth/AuthHome';
import MainHome from '../modules/home/Home';
import { withDependency } from '../services/DependencyContext';
import IFirebaseService from '../services/IFirebaseService';

export interface IProps {
  firebase: IFirebaseService;
}

interface IState {
  user: User | null;
}

export class HomeSwitch extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: null
    };

    this.onUserChange = this.onUserChange.bind(this);
  }

  private onUserChange(user: User | null) {
    this.setState({ user });
  }

  public componentDidMount(): void {
    this.props.firebase.addAuthListener(this.onUserChange);
  }

  public componentWillUnmount(): void {
    this.props.firebase.removeAuthListener(this.onUserChange);
  }

  public render() {
    if (this.state.user) {
      return <MainHome firebase={this.props.firebase} />;
    } else {
      return <AuthHome firebase={this.props.firebase} />;
    }
  }
}

export default withDependency(HomeSwitch, service => ({
  firebase: service.getFirebaseService()
}));
