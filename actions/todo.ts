import { Todo } from "types/todo";

function addTodo(todo: Todo) {
  return {
    type: "ADDTODO" 
  } as const
}