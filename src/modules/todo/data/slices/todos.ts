import createCrudSlice from '../../../../utils/createCrudSlice';
import ITodo from '../models/ITodo';
import Todo from '../models/Todo';

const todo = createCrudSlice<ITodo>('todo', Todo);

export default todo;
