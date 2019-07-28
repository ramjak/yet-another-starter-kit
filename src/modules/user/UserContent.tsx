import { Map, Record } from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';
import { rootReducerStateType } from '../../store';
import IUser from './data/models/IUser';
import users, { userReq } from './data/slices/users';

interface IProps {
  users: Map<string, Record<IUser>>;
  initUserStore: (users: IUser[]) => void;
}

interface IState {}

class UserContent extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public async componentDidMount() {
    if (userReq && userReq.fetchAll) {
      const users = await userReq.fetchAll();
      this.props.initUserStore(users);
    }
  }

  public render() {
    return (
      <React.Fragment>
        <ul>
          {this.props.users.valueSeq().map(user => (
            <li>{user.get('name')}</li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: rootReducerStateType) => ({
  users: state.user
});

const mapDispatchToProps = {
  initUserStore: users.actions.init
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContent);
