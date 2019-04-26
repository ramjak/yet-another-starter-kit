import {
  combineReducers,
  configureStore,
  getDefaultMiddleware
} from 'redux-starter-kit';

const reducer = combineReducers({
});

// tslint:disable-next-line
const store = configureStore<any, any>({
  enhancers: [],
  middleware: [...getDefaultMiddleware()],
  reducer
});

export default store;
