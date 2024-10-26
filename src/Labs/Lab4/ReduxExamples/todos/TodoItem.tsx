import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

interface Todo {
    id: number;
    title: string;
  }
export default function TodoItem({ todo }: { todo: Todo }) {
    const dispatch = useDispatch();
    return (
        <li
        key={todo.id}
        className="list-group-item d-flex justify-content-between align-items-center border"
      >
        {todo.title}
        <div className="ml-auto">
        <button
          className="btn btn-primary ms-2"
          onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click"
        >
          Edit{" "}
        </button>
        <button
          className="btn btn-danger ms-2"
          onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click"
        >
          Delete{" "}
        </button>
        </div>
      </li>);}
  
  