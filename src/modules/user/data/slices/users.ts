import ServiceFactory from '../../../../services/ServiceFactory';
import createCrudSlice from '../../../../utils/createCrudSlice';
import IReq from '../../../../utils/IReq';
import IUser from '../models/IUser';
import userFactory from '../models/User';

const req = ServiceFactory.getRequestService();
export const userReq: IReq<IUser> = {
  fetch: id => req.get(`/users/${id}`),
  fetchAll: () => req.get('/users')
};

export default createCrudSlice<IUser>('user', userFactory, userReq);
