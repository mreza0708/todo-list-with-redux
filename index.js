import {
  AddTodo,
  RemoveTodo,
  DoTodo
} from "./Redux/actionType.js";

import {
  AddTodoAction,
  RemoveTodoAction,
  DoTodoAction,
  getAllTodosAction

} from "./Redux/actionCreate.js";

const addBtn = document.querySelector(".add-btn");
const todoInput = document.querySelector(".text-input");
const todosContainer = document.querySelector('.todo');
const todoFiltering = document.querySelector('.status')
const todoItem = document.querySelector('.todo-item')
window.removeHandler = removeHandler
window.todoHandler = todoHandler


function Reducer(state = [], action) {
  switch (action.type) {
    case AddTodo: {
      const newState = [...state];
      const newTodoObj = {
        id: crypto.randomUUID(),
        title: action.title,
        isCompleted: false,
      };
      newState.push(newTodoObj);

      return newState;
    }

    case RemoveTodo: {
      let copyState = [...state];
      let newState = copyState.filter((todo) => todo.id != action.id);
      return newState;
    }

    case DoTodo: {
      let newState = [...state];
      newState.some((todo) => {
        if (todo.id == action.id) {
          todo.isCompleted = !todo.isCompleted
        }
      });
      return newState;
    }

    
    default: {
      return state
    }
  }
}

const Store = Redux.createStore(Reducer);

 const unsubscribe = Store.subscribe(()=>{
  console.log('state get update! the new state is ' , Store.getState())
})
setTimeout(()=>{
  unsubscribe()
} , 10000)


addBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const newTodoTitle = todoInput.value.trim();
  Store.dispatch(AddTodoAction(newTodoTitle));
  const todos = Store.getState();
  todoInput.value = "";
  ShomInDOm(todos);

});

function removeHandler(todoId){
  Store.dispatch(RemoveTodoAction(todoId))
  let todos = Store.getState()
  ShomInDOm(todos)

}


function todoHandler(todoId){

Store.dispatch(DoTodoAction(todoId));
let todos = Store.getState();;
ShomInDOm(todos);

}


todoFiltering.addEventListener('change' , (event)=>{

Store.dispatch(getAllTodosAction())
  let todos = Store.getState();

if(event.target.value == 'all'){
ShomInDOm(todos)
}
else if(event.target.value == 'complete') {
  let CompletedTodo = todos.filter(todo => todo.isCompleted)
ShomInDOm( CompletedTodo)
}
else if(event.target.value == 'uncomplete') {
  let InCompletedTodo = todos.filter(todo => !todo.isCompleted)
  ShomInDOm( InCompletedTodo)
}







})









function ShomInDOm(todos) {
  todosContainer.innerHTML = '',
  todos.forEach(todo => {
    todosContainer.insertAdjacentHTML(
      'beforeend' , `
      <div id="my" class="todo ${todo.isCompleted && 'completed'}" >
          <div class="todo-item">${todo.title}</div>
          <button class="trash-btn" onclick=removeHandler("${todo.id}")>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon">
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
              />
              <path
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
              />
            </svg>
          </button>
          <button class="complete-btn"  onclick=todoHandler("${todo.id}")>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon">
              <path
                d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </button>
        </div>
      
      
      `
    )
    
  });


}
