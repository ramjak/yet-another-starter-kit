import { Record } from 'immutable';

export default interface ITodo {
  isDone: boolean;
  task: string;
}

export type ITodoStructure = Record<ITodo>;
