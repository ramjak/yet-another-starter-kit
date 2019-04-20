import { Map, Record } from 'immutable';
import { createSlice, PayloadAction } from 'redux-starter-kit';
import idGenerator from './IdGenerator';

// todo: get app name reduced from package.json
const prefix = 'sampleApp/';

// todo: need an async func
export default function createCrudSlice<I>(
  entityFactory: (instance: I) => Record<I>
) {
  type entityType = Record<I>;
  type IStore = Map<string, entityType>;
  const store: IStore = Map({});

  const create = (state: any, action: PayloadAction<I>) => {
    const immutableTodo = entityFactory(action.payload);
    const id = idGenerator.generate();

    return state.set(id, immutableTodo);
  };

  const update = (
    state: any,
    action: PayloadAction<{ oldTodo: entityType | string; newTodo: Record<I> }>
  ) => {
    const newTodo = action.payload.newTodo;
    let newState;
    if (typeof action.payload.oldTodo === 'string') {
      newState = state.set(action.payload.oldTodo, newTodo);
    } else {
      newState = state.map((todo: entityType) =>
        todo === action.payload.oldTodo ? newTodo : todo
      );
    }

    return newState;
  };

  const deleteItem = (
    state: any,
    action: PayloadAction<entityType | string>
  ) => {
    let isFound = false;
    let filterFunc;
    if (typeof action.payload === 'string') {
      filterFunc = (val: entityType, key: string) => {
        isFound = key === action.payload;
        return isFound;
      };
    } else {
      filterFunc = (val: entityType) => {
        isFound = val === action.payload;
        return isFound;
      };
    }

    return state.filterNot(filterFunc);
  };

  // wrap this around with async dispatch and create createAsyncSlice
  return createSlice({
    initialState: store as IStore,
    reducers: {
      create,
      delete: deleteItem,
      update
    },
    slice: prefix + 'todo'
  });
}
