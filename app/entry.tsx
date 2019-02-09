import * as ReactDom from "react-dom";
import * as React from "react";

import {TodoDetail} from "app/view/TodoDetail";
import { makeTodo } from "app/types/todo";
const root = document.getElementById("app");


ReactDom.render(
  <TodoDetail todo={makeTodo("id", "title")}></TodoDetail> , root);
