// import {Todo} from "types/todo";

// interface View<Arg> {
// }

// interface OutputPort<D> {
//   run(arg: D): void;
// }

// abstract class Presenter<I, O> {
//   constructor (
//     protected inputPort: InputPort<I>,
//     protected outputPort: OutputPort<O>
//   ) {}

// }

// interface InputPort<D> {}

// export const ShowAll = {
//   type: "ShowAll"
// } as const
// const ShowCompleted = {
//   type: "ShowCompleted"
// } as const

// const ShowSelected = (todos: Todo[]) => {
//   return {
//   type: "ShowSelected",
//   selectedTodos: todos,
//   } as const
// }

// export type ListFilter = typeof ShowAll | typeof ShowCompleted | ReturnType<typeof ShowSelected>;
// const filterTodos = (filter: ListFilter) => (todos: Todo[]) => {
//   switch(filter.type) {
//     case "ShowAll": return todos
//     case "ShowCompleted": return []
//     case "ShowSelected": return []
//   }
// }

// export class TodoPresenter extends Presenter<null, Todo[]> {
//   constructor(
//     private requestTodos: () => Promise<Todo[]>,
//     inputPort: InputPort<null>,
//     outputPort: OutputPort<Todo[]>
//   ) {
//     super(inputPort, outputPort)
//   }

//   async changeFilter(filter: ListFilter) {
//     const todos = await this.requestTodos();
//     this.outputPort.run(filterTodos(filter)(todos));
//   }
// }
