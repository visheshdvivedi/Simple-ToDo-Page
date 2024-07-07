const searchInput = document.getElementById("search-input");
const createBtn = document.getElementById("create-btn");

const totalTaskLabel = document.getElementById("total-task-label");
const completedLabel = document.getElementById("completed-label");

const emptyListContainer = document.getElementById("empty-list-container");
const todoListContainer = document.getElementById("todo-list-container");

const trashSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height=“24” fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>';

createBtn.addEventListener("click", (event) => {
    const content = searchInput.value;
    if (!content) {
        alert("Please enter any content in textbox to create new todo");
        return;
    }
    appendTodo(content);
    searchInput.value = "";
});

const createTodoItem = (data) => {

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("todo-item");
    itemDiv.setAttribute("data-id", data.id);
    if (data.completed)
        itemDiv.classList.add("todo-item-completed");

    const todoLeftDiv = document.createElement("div");
    todoLeftDiv.classList.add("todo-left-div");

    const markBtn = document.createElement("button");
    markBtn.classList.add("mark-todo-btn");
    markBtn.addEventListener("click", (event) => {
        markTodoCompleted(data.id);
    })

    const completedImg = document.createElement("img");
    completedImg.classList.add("completed-img");
    completedImg.src = "assets/Layer 1.png";

    const textSpan = document.createElement("span");
    textSpan.innerText = data.content;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-todo-btn");
    deleteBtn.innerHTML = trashSVG;
    deleteBtn.addEventListener("click", (event) => {
        deleteTodo(data.id);
    });

    todoLeftDiv.appendChild(markBtn);
    todoLeftDiv.appendChild(completedImg);
    todoLeftDiv.appendChild(textSpan);

    itemDiv.appendChild(todoLeftDiv);
    itemDiv.appendChild(deleteBtn);

    todoListContainer.appendChild(itemDiv);
}

const retrieveTodos = () => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (!todos)
        return [];
    return todos;
}

const updateTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
    window.location.reload();
}

const retrieveTodoIndex = () => {
    const index = localStorage.getItem("todo_index");
    if (!index)
        return 0;
    return parseInt(index); 
}

const updateTodoIndex = () => {
    const index = retrieveTodoIndex();
    localStorage.setItem("todo_index", index + 1);
}

const appendTodo = (todo) => {
    const index = retrieveTodoIndex();
    const todos = retrieveTodos();
    todos.push({ id: index + 1, content: todo, completed: false });
    updateTodos(todos);
}

const markTodoCompleted = (id) => {
    const todos = retrieveTodos();
    for (let i=0; i<todos.length; i++) {
        if (todos[i].id === id){
            todos[i].completed = true;
            break;
        }
    }
    updateTodos(todos);
}

const deleteTodo = (id) => {
    const todos = retrieveTodos();
    const todo = todos.find(todo => todo.id === id);
    todos.splice(todos.indexOf(todo), 1);
    updateTodos(todos);
};

const clearAllTodos = () => {
    for (let todo of document.getElementsByClassName("todo-item")) {
        todo.remove();
    }
}

const updateTodoUI = (todos) => {
    clearAllTodos();

    if (todos.length) {
        emptyListContainer.style.display = "none";
        for (let todo of todos)
            createTodoItem(todo);
    }
    else {
        emptyListContainer.style.display = "flex";
    }
    
    totalTaskLabel.innerText = todos.length;
    completedLabel.innerText = todos.filter(todo => todo.completed).length;
}

updateTodoUI(retrieveTodos());