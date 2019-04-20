import {
  combineReducers,
  configureStore,
  getDefaultMiddleware
} from 'redux-starter-kit';
// noinspection SpellCheckingInspection
import todo from './modules/todo/data/slices/todos';

const reducer = combineReducers({
  todo: todo.reducer
});

const store = configureStore({
  enhancers: [],
  middleware: [...getDefaultMiddleware()],
  reducer
});

export default store;