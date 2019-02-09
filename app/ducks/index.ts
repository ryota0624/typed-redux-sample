import * as todo from 'app/ducks/todo';
import * as user from 'app/ducks/user';
import { makeTodo } from 'app/types/todo';
import * as redux from 'redux';

type Action = todo.Action | user.Action;
type State = {
  todo: todo.State;
  user: user.State;
};

export const reducer = redux.combineReducers<State, Action>({
  todo: todo.reducer,
  user: user.reducer
});
export function createStore() {
  return redux.createStore(reducer);
}
export const store = createStore();
