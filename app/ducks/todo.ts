import { Todo, ID } from 'app/types/todo';
import { CreatorsToActions, makeReducer } from 'app/ducks/helper';

export const ActionCreators = {
  addTodo(todo: Todo) {
    return {
      type: 'ADDTODO',
      todo
    } as const;
  },
  deleteTodo(id: ID<Todo>) {
    return {
      type: 'DELETETODO',
      id
    } as const;
  },
  reloadTodos() {
    return {
      type: 'RELOADTODO'
    } as const;
  }
};

export type Action = CreatorsToActions<typeof ActionCreators>;

export type State = {
  readonly todos: Todo[];
};

const initialState: State = {
  todos: []
};

export const reducer = makeReducer<State, Action>({
  apply(state, action): State {
    switch (action.type) {
      case 'ADDTODO':
        return { ...state, todos: state.todos.concat(action.todo) };
      case 'DELETETODO':
        return {
          ...state,
          todos: state.todos.filter(todo => todo.id !== action.id)
        };
      case 'RELOADTODO':
        return state;
    }
  },
  initialState
});
