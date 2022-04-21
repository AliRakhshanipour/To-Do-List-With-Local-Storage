let $ = document;
// set DOM ELEMENTS FOR PROJECT
const addBtn = $.querySelector("#addButton");
const clearBtn = $.querySelector("#clearButton");
const inputElement = $.querySelector("#itemInput");
const ulElement = $.querySelector("#todoList");
//================================================================

addBtn.onclick = addBtnHandler; //SET ONCLICK FOR ADD BUTTUN IN DOM
clearBtn.onclick = clearBtnHandler; //SET ONCLICK FOR CLEAR BUTTUN IN DOM
//================================================================

inputElement.addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    addBtnHandler();
  }
}); //SET KEYDOWN FOR ADD TASK TO TODOLIST WITH PRESSING ENTER KEY
//================================================================

let todoArray = []; //SET ARRAY FOR TODOLIST
//----------------------------------------------------------------

function addBtnHandler() {
  let newTodoTitle = inputElement.value;
  let newTodoObj = {
    id: todoArray.length + 1,
    title: newTodoTitle,
    completed: false,
  };
  todoArray.push(newTodoObj);
  setLocalStorage(todoArray);
  todoGenerator(todoArray);
  inputElement.value = "";
  inputElement.focus();
} // HANDLER FOR ADD TASK TO TODOLIST
//================================================================

function setLocalStorage(todoList) {
  localStorage.setItem("todoList", JSON.stringify(todoList));
} //SET ITEMS IN LOCAL_STORAGE
//================================================================

function todoGenerator(todoList) {
  let newTodoLiElement,
    newTodoLabelElement,
    newTodoCompleteBtn,
    newTodoDeleteBtn;
  ulElement.innerHTML = "";
  todoList.forEach(function (todo) {
    // CREATE LI TAG TODO
    newTodoLiElement = $.createElement("li");
    newTodoLiElement.classList.add("completed", "well");
    //CREATE LABEL TAG
    newTodoLabelElement = $.createElement("label");
    newTodoLabelElement.innerHTML = todo.title;
    //CREATE Complete BUTTUN
    newTodoCompleteBtn = $.createElement("buttun");
    newTodoCompleteBtn.classList.add("btn", "btn-success");
    newTodoCompleteBtn.innerHTML = "To Do";
    newTodoCompleteBtn.setAttribute("onclick", "editTodo(" + todo.id + ")");
    //CREATE DELETE BUTTUN
    newTodoDeleteBtn = $.createElement("buttun");
    newTodoDeleteBtn.classList.add("btn", "btn-danger");
    newTodoDeleteBtn.innerHTML = "Delete";
    // APPEND CREATED TAGS TO LI TAG ON DOM
    newTodoLiElement.append(
      newTodoLabelElement,
      newTodoCompleteBtn,
      newTodoDeleteBtn
    );
    newTodoDeleteBtn.setAttribute("onclick", "removeTodo(" + todo.id + ")"); //SET FUNCTION TO REMOVE EVERY TASK WE CLICK ON DELETE BUTTUN
    ulElement.append(newTodoLiElement); // APPEND CREATED TAGS TO ulElement ON DOM
    if (todo.completed) {
      newTodoLiElement.classList.add("uncompleted", "well");
      newTodoCompleteBtn.classList.add("btn", "btn-info");
      newTodoCompleteBtn.innerHTML = "Done!";
    }
  });
} //SET AND CREATE NEW TODO ELEMENTS TODOLIST
//================================================================

function removeTodo(todoId) {
  let localStorageTodos = JSON.parse(localStorage.getItem("todoList"));
  todoArray = localStorageTodos;
  let mainTodoIndex = todoArray.findIndex((todo) => {
    return todo.id === todoId;
  });
  todoArray.splice(mainTodoIndex, 1);
  setLocalStorage(todoArray);
  todoGenerator(todoArray);
} // SET FUNCTION FOR REMOVE TODO ONE TODOTASK
//============================== =================================

function editTodo(todoId) {
  let localStorageTodos = JSON.parse(localStorage.getItem("todoList"));
  todoArray = localStorageTodos;
  todoArray.forEach((todo) => {
    if (todo.id === todoId) {
      todo.completed = !todo.completed;
    }
  });
  setLocalStorage(todoArray);
  todoGenerator(todoArray);
} //SET FUNCTION FOR TASKS TO BE DONE OR UNCOMPLETED
//================================================================

function getLocalStorage() {
  let localStorageTodos = JSON.parse(localStorage.getItem("todoList"));
  if (localStorageTodos) {
    todoArray = localStorageTodos;
  } else {
    todoArray = [];
  }
  todoGenerator(todoArray);
} // GET TASKS FROM LOCAL_STORAGE FOR LOADING PAGE
// ============================== ================================

window.onload = getLocalStorage;
// CLEAR BUTTUN HANDLER
//=============================== ================================

function clearBtnHandler() {
  todoArray = [];
  todoGenerator(todoArray);
  // localStorage.clear();
  localStorage.removeItem("todoList");
} // SET FUNCTION FOR REMOVE TASKS FROM LOCAL_STORAGE
