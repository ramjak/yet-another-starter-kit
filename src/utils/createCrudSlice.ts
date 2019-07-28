import { Map, Record } from 'immutable';
import { createSlice, PayloadAction } from 'redux-starter-kit';
import idGenerator from './IdGenerator';
import IReq from './IReq';

// todo: get app name reduced from package.json
const prefix = 'sampleApp/';

// todo: action need to be async
export default function createCrudSlice<I>(
  entityFactory: (instance: I) => Record<I>,
  serverReq?: IReq<I>
) {
  type entityType = Record<I>;
  type IStore = Map<string, entityType>;
  const store: IStore = Map({});

  const create = (state: any, action: PayloadAction<I>) => {
    const immutableTodo = entityFactory(action.payload);
    // todo: id can be retrieved in api call
    const id = idGenerator.generate();
    serverReq && serverReq.create && serverReq.create(action.payload);

    return state.set(id, immutableTodo);
  };

  const update = (
    state: any,
    action: PayloadAction<{ oldObj: entityType | string; newObj: Record<I> }>
  ) => {
    const { newObj, oldObj } = action.payload;

    let newState;
    const newJsObj = newObj.toObject();
    if (typeof oldObj === 'string') {
      newState = state.set(oldObj, newObj);

      serverReq && serverReq.update && serverReq.update(oldObj, newJsObj);
    } else {
      newState = state.map((todo: entityType) =>
        todo === oldObj ? newObj : todo
      );

      // todo: id can be retrieved in map key
      const objId = newObj.hashCode().toString();
      serverReq && serverReq.update && serverReq.update(objId, newJsObj);
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
      serverReq && serverReq.delete && serverReq.delete(action.payload);
    } else {
      filterFunc = (val: entityType) => {
        isFound = val === action.payload;
        return isFound;
      };
      // todo: id can be retrieved in map key
      const objId = action.payload.hashCode().toString();
      serverReq && serverReq.delete && serverReq.delete(objId);
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
