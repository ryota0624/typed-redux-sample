import * as React from 'react';
import { useState, useEffect, useReducer } from 'react';
import { Todo } from 'app/types/todo';

type EditableTodo = {
  title: string;
};

const ResetTitle = {
  type: 'ResetTitle'
} as const;

const EditTitle = (title: string) => {
  return {
    type: 'EditTitle',
    title
  } as const;
};
type EditTodoActions = typeof ResetTitle | ReturnType<typeof EditTitle>;

export function useTodoEdit(todo: Todo): any {
  const initialEditableTodo = { ...todo };
  const [editableTodo, dispatch] = useReducer(
    (state: EditableTodo, action: EditTodoActions) => {
      switch (action.type) {
        case 'EditTitle':
          return { ...state, title: action.title };
        case 'ResetTitle':
          return initialEditableTodo;
      }
    },
    initialEditableTodo
  );

  return [editableTodo, dispatch] as const;
}

export type Props = {
  todo: Todo;
  onChangeIdViewable?: (bool: boolean) => void;
  onEditedTodo?: (editableTodo: EditableTodo) => Promise<never> | void;
};

export function className(detail: TemplateStringsArray) {
  return `todo-detail-${detail.raw.join('')}`;
}

export function TodoDetail({ todo, onChangeIdViewable, onEditedTodo }: Props) {
  const [isIdViewable, setIdViewable] = useState(true);
  const [editableTodo, dispatchEdit] = useTodoEdit(todo);
  const [isEdittingTodo, setEdittingTodo] = useState(false);
  useEffect(() => {
    if (onChangeIdViewable) onChangeIdViewable(isIdViewable);
  }, [isIdViewable]);

  useEffect(() => {
    if (!isEdittingTodo) {
      dispatchEdit(ResetTitle);
    }
  }, [isEdittingTodo]);

  const editTitleFormKeyDownHandler = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      if (onEditedTodo) {
        const edited = onEditedTodo(editableTodo);
        Promise.resolve()
          .then(() => edited as any)
          .then(() => setEdittingTodo(false));
        return;
      }
      setEdittingTodo(false);
    }
  };

  return (
    <div className={className`wrapper`}>
      <ul>
        <li className={className`id`}>{isIdViewable ? todo.id : 'sercret'}</li>
        <button
          onClick={() => setIdViewable(prev => !prev)}
          className={className`id-button`}
        >
          {isIdViewable ? 'IDを隠す' : 'IDを表示する'}
        </button>
        {isEdittingTodo ? (
          <input
            onKeyDown={editTitleFormKeyDownHandler}
            onChange={e => dispatchEdit(EditTitle(e.target.value))}
            value={editableTodo.title}
          />
        ) : (
          <li
            onClick={() => setEdittingTodo(true)}
            className={className`title`}
          >
            {todo.title}
          </li>
        )}
      </ul>
    </div>
  );
}
