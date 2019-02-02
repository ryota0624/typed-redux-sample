import * as todo from "actions/todo";
import * as user from "actions/user";
import {makeTodo} from "types/todo";
import * as redux from "redux";

type Action = todo.Action | user.Action;
type State = {
  todo: todo.State,
  user: user.State,
};

const reducer = redux.combineReducers<State, Action>({
  todo: todo.reducer,
  user: user.reducer
});

const store = redux.createStore(reducer);

store.dispatch(todo.ActionCreators.addTodo(makeTodo("1", "hello")));
store.dispatch(todo.ActionCreators.deleteTodo("hello"));
