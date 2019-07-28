import React, { Component } from 'react';
import IFirebaseService from '../../services/IFirebaseService';
import TodoContent from '../todo/TodoContent';
import UserContent from '../user/UserContent';

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
    return (
      <React.Fragment>
        <button onClick={this.signOut}>Sign Out</button>
        {/*<TodoContent />*/}
        <UserContent />
      </React.Fragment>
    );
  }
}

export default Home;
