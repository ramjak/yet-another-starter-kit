import { Map, Record } from 'immutable';
import createCrudSlice from '../../../../utils/createCrudSlice';
import ITodo from '../models/ITodo';
import Todo from '../models/Todo';

const todo = createCrudSlice<ITodo>(Todo);
export type ITodoStore = Map<string, Record<ITodo>>;

export default todo;
