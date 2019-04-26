import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import AuthHome from '../modules/auth/AuthHome';
import Home from '../modules/home/Home';
import { HomeSwitch, IProps } from './HomeSwitch';

describe('<HomeSwitch />', () => {
  configure({ adapter: new Adapter() });
  const props: IProps = {
    firebase: {
      addAuthListener: jest.fn(),
      getCurrentUser: jest.fn(),
      removeAuthListener: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn()
    }
  };

  it('should be render AuthHome when user has not logged in yet', () => {
    const newProps = Object.assign({}, props);
    newProps.firebase.getCurrentUser = () => null;
    const homeSwitch = shallow(<HomeSwitch {...newProps} />);
    const authHomeCount = homeSwitch.find(AuthHome).length;

    expect(authHomeCount).toBe(1);
  });

  it('should be render MainHome when user is already logged in', () => {
    const newProps = Object.assign({}, props);
    newProps.firebase.addAuthListener = (cb: any) =>
      cb({ displayName: 'test' });
    const homeSwitch = shallow(<HomeSwitch {...newProps} />);
    const mainHomeCount = homeSwitch.find(Home).length;

    expect(mainHomeCount).toBe(1);
  });
});
