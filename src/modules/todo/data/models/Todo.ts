import { Record } from 'immutable';
import ITodo, { ITodoStructure } from './ITodo';

const todoRecordFactory = Record<ITodo>({
  isDone: false,
  task: ''
});

export default (instance: ITodo): ITodoStructure => todoRecordFactory(instance);
