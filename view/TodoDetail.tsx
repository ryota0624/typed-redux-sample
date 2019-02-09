import * as React from "react";
import {useState, useEffect} from "react";
import { Todo } from "types/todo";

export type Props = {
  todo: Todo,
  onChangeIdViewable?: (bool: boolean) => void
};

export function className(detail: TemplateStringsArray) {
  return `todo-detail-${detail.raw.join("")}`
}

export function TodoDetail({todo, onChangeIdViewable}: Props) {
  const [isIdViewable, setIdViewable] = useState(true);
  useEffect(() => {
    if (onChangeIdViewable) onChangeIdViewable(isIdViewable)
  }, [isIdViewable]);
   return (
    <div>
      <ul>
        <li className={className`id`}>{isIdViewable ? todo.id : "sercret"}</li>
        <button onClick={() => setIdViewable((prev) => !prev)} className={className`id-button`}>
        </button>
        <li className={className`title`}>{todo.title}</li>
      </ul>
    </div>
  )
};