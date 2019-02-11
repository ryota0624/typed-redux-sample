import * as ReactDom from 'react-dom';
import * as React from 'react';

import { TodoDetail } from 'app/view/TodoDetail';
import { MusicSelector } from 'app/view/MusicSelector';

import { makeTodo, Todo } from 'app/types/todo';

const root = document.getElementById('app');

function TodoDetails({ todos }: { todos: Todo[] }) {
  return (
    <div>
      {todos.map(todo => (
        <TodoDetail
          key={todo.id}
          todo={todo}
          onEditedTodo={e => {
            console.log(e);
          }}
        />
      ))}
    </div>
  );
}

const todos = Array.from({
  length: 0
}).map((_, i) => {
  return makeTodo(`id-${i}`, `title-${i}`);
});

ReactDom.render(
  <>
  <MusicSelector></MusicSelector>
  <TodoDetails todos={todos} />
  </>
  , root);
