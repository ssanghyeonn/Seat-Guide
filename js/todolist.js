const todoform = document.querySelector("#todoform");
const todoInput = document.querySelector("#todoform input");
const todoList_ul = document.querySelector("#todolist");
const curDate_p = document.querySelector("#cur_date");

todoform.addEventListener("submit", handleToDosummit);

let DBLists = [];
let currentDate;
const DBLIST_KEY = "DBLISTS"

function TodoList(date) {
    this.date = date;
    this.todos = [];
}

function clearTodoItems() {
    console.log("clearTodoItems is called");

    while (todoList_ul.firstChild) {
        todoList_ul.removeChild(todoList_ul.firstChild)
    }
}

function displayTodoItem(item) {

    console.log("displayTodoItem is called");
    const todo_cur_li = document.createElement("li");
    const todo_cur_span = document.createElement("span");
    const todo_remove_btn = document.createElement("button");

    todo_cur_span.innerText = item;
    todo_remove_btn.innerText = "X";

    todo_cur_li.appendChild(todo_cur_span);
    todo_cur_li.appendChild(todo_remove_btn);

    todoList_ul.appendChild(todo_cur_li);

}

function handleToDosummit(parm) {
    console.log("handleTodosummit is called");
    parm.preventDefault();
    const curTodo = todoInput.value;
    console.log("todoInput value : " + curTodo);

    todoInput.value = "";

    displayTodoItem(curTodo)

    addNewTodo(currentDate, curTodo);

    //save localstorge code
    saveDBListInLocalStorage();
}

function setCurrentDate(date) {
    console.log("setCurrentDate - " + date);
    curDate_p.textContent = date + " 일정"
    currentDate = date;
}

function addNewTodo(date, newTodo) {
    console.log("addNewTodo is called");

    curTodoList = DBLists.find(list => list.date === date)
    if (!curTodoList) {
        curTodoList = new TodoList(date);
        DBLists.push(curTodoList);
    }
    curTodoList.todos.push(newTodo);

}

function saveDBListInLocalStorage() {
    console.log("saveDBListInLocalStorage is called");
    localStorage.setItem(DBLIST_KEY, JSON.stringify(DBLists));

}
function loadcurrentTodo() {
    console.log("loadcurrentTodo is called");

    //기존의 화면에 displ된 item
    clearTodoItems()

    //DBList 가져와서 초기화 해주는 부분
    const savedDBLists = localStorage.getItem(DBLIST_KEY)

    if (savedDBLists !== null) {
        DBLists = JSON.parse(savedDBLists)
    }
    console.log(DBLists)

    //DBLists 화면에 출력하기
    if (!DBLists) {
        return
    }

    DBLists.forEach(tlist => {
        if (tlist.date === currentDate) {
            tlist.todos.forEach(displayTodoItem)
        }
    })
}

function loadTodoInit() {
    console.log("loadTodoInit is called");

    //날짜 가져와서 초기화 해주는 부분
    var today = new Date()
    var formattedToday = today.toISOString().split('T')[0];
    console.log(formattedToday);
    setCurrentDate(formattedToday);

    loadcurrentTodo();

}

loadTodoInit()