import { Record } from 'immutable';
import IUser from './IUser';

const userFactory = Record<IUser>({
  address: {
    city: '',
    geo: {
      lat: 0,
      lng: 0
    },
    street: '',
    suit: ''
  },
  email: '',
  id: 0,
  name: ''
});

export default userFactory;
