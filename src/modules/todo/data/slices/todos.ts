import createCrudSlice from '../../../../utils/createCrudSlice';
import ITodo from '../models/ITodo';
import Todo from '../models/Todo';

const todo = createCrudSlice<ITodo>(Todo);

export default todo;
