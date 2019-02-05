import {createStore} from "ducks/index";
import * as todoDucks from "ducks/todo";
import * as typeTodo from "types/todo";
test("dispatch create todo", () => {
  const store = createStore();
  const todo = typeTodo.makeTodo("sample", "title");
  store.dispatch(todoDucks.ActionCreators.addTodo(todo));
  store.subscribe(() => {
    expect(store.getState().todo.todos).toBe([todo]);
  });
});