export type ID<Entity> = string;
export type Todo = {
  id: ID<Todo>;
  title: string;
};

export function makeTodo(id: ID<Todo>, title: string): Todo {
  return {
    id,
    title
  };
}
