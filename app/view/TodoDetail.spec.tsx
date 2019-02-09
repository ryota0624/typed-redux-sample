import {shallow, mount, render} from "enzyme";
import * as React from "react";
import {makeTodo} from "app/types/todo";
import {TodoDetail} from "app/view/TodoDetail";
test('レンダリングが行われる', () => {
  // == given ==
  const wrapper = shallow(<TodoDetail todo={makeTodo("id", "sample")}/>);

  // == when ==
  /** 各コンポーネントの数を取得し、1であればOK */
  expect(wrapper.find("li").length).toBe(2);
});

test("各フィールドが表示される", () => {
    const todo = makeTodo("id", "sample");
    const wrapper = shallow(<TodoDetail todo={todo}/>);
    expect(wrapper.find(".todo-detail-title").text()).toBe(todo.title);
    expect(wrapper.find(".todo-detail-id").text()).toBe(todo.id);
});

test("id表示隠すボタン", () => {
  const handleChangeSpy = jest.fn();

  const todo = makeTodo("id", "sample");
  const wrapper = shallow(<TodoDetail todo={todo} onChangeIdViewable={handleChangeSpy}/>);
  const idButton = wrapper.find(".todo-detail-id-button");
  idButton.simulate("click");
  
  expect(wrapper.find(".todo-detail-id").text()).toBe("secret");
  expect(handleChangeSpy).toHaveBeenCalledWith(false);
});