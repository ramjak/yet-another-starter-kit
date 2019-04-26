import React, { Component } from 'react';
import IFirebaseService from '../../services/IFirebaseService';

export interface IProps {
  firebase: IFirebaseService;
}

interface IState {}

class Home extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
    this.signOut = this.signOut.bind(this);
  }

  private async signOut() {
    await this.props.firebase.signOut();
  }

  public render() {
    return <button onClick={this.signOut}>Sign Out</button>;
  }
}

export default Home;
