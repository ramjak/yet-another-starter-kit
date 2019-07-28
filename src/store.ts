import {
  combineReducers,
  configureStore,
  getDefaultMiddleware
} from 'redux-starter-kit';
// noinspection SpellCheckingInspection
import todo from './modules/todo/data/slices/todos';
import user from './modules/user/data/slices/users';

const reducer = combineReducers({
  todo: todo.reducer,
  user: user.reducer
});

export type rootReducerStateType = ReturnType<typeof reducer>;

const store = configureStore({
  enhancers: [],
  middleware: [...getDefaultMiddleware()],
  reducer
});

export default store;
