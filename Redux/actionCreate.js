import {
  AddTodo,
  RemoveTodo,
  DoTodo,
  getAllTodos
  
} from "./actionType.js";

function AddTodoAction(title) {
  return {
    type: AddTodo,
    title,
  };
}

function RemoveTodoAction(id) {
  return {
    type: RemoveTodo,
    id,
  };
}

function DoTodoAction(id) {
  return {
    type: DoTodo,
    id,
  };
}

function getAllTodosAction(id) {
  return {
    type: getAllTodos,
    id,
  };
}



export {
  AddTodoAction,
  RemoveTodoAction,
  DoTodoAction,
  getAllTodosAction
 
};
