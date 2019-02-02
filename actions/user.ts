import { Todo, ID } from "types/todo";
import { CreatorsToActions, makeReducer } from "actions/helper";

//一旦適当

export const ActionCreators = {
  addUser(user: Todo) {
    return {
      type: "ADDUser",
      user,
    } as const
  },
  deleteUser(id: ID<Todo>) {
    return {
      type: "DELETEUser",
      id,
    } as const
  }
}

export type Action = CreatorsToActions<typeof ActionCreators>;

export type State = {
  readonly users: Todo[]
}

const initialState: State = {
  users: []
}

export const reducer = makeReducer<State, Action>({
  apply(state, action): State {
    switch(action.type) {
      case "ADDUser": 
        return {...state, users: state.users.concat(action.user)}
      case "DELETEUser":
        return {...state, users: state.users.filter(todo => todo.id !== action.id)}
    }
  },
  initialState
});
