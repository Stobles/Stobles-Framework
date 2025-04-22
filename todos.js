var todos = ["Погулять с лаймой", "Откликнуться на вакансии"];
var todoInput = document.getElementById("todo-text");
var submitButton = document.getElementById("add-todo");
var todoList = document.getElementById("todo-list");
for (var _i = 0, todos_1 = todos; _i < todos_1.length; _i++) {
    var todo = todos_1[_i];
    todoList === null || todoList === void 0 ? void 0 : todoList.append(renderTodoInReadMode(todo));
}
todoInput === null || todoInput === void 0 ? void 0 : todoInput.addEventListener("input", function () {
    submitButton.disabled = todoInput.value.length < 3;
});
todoInput.addEventListener("keydown", function (_a) {
    var key = _a.key;
    if (key === "Enter" && todoInput.value.length >= 3) {
        addTodo();
    }
});
submitButton.addEventListener("click", function () {
    addTodo();
});
function renderTodoInReadMode(todo) {
    var li = document.createElement("li");
    var span = document.createElement("span");
    span.textContent = todo;
    span.addEventListener("dblclick", function () {
        console.log("mek");
        var idx = todos.indexOf(todo);
        todoList === null || todoList === void 0 ? void 0 : todoList.replaceChild(renderTodoInEditMode(todo), todoList.childNodes[idx]);
    });
    li.append(span);
    var button = document.createElement("button");
    button.textContent = "Done";
    button.addEventListener("click", function () {
        var idx = todos.indexOf(todo);
        removeTodo(idx);
    });
    li.append(button);
    return li;
}
function renderTodoInEditMode(todo) {
    var li = document.createElement("li");
    var input = document.createElement("input");
    input.type = "text";
    input.value = todo;
    li.append(input);
    var saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.addEventListener("click", function () {
        var idx = todos.indexOf(todo);
        updateTodo(idx, input.value);
    });
    li.append(saveBtn);
    var cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.addEventListener("click", function () {
        var idx = todos.indexOf(todo);
        todoList === null || todoList === void 0 ? void 0 : todoList.replaceChild(renderTodoInReadMode(todo), todoList.childNodes[idx]);
    });
    li.append(cancelBtn);
    return li;
}
function addTodo() {
    var description = todoInput.value;
    todos.push(description);
    var todo = renderTodoInReadMode(description);
    todoList === null || todoList === void 0 ? void 0 : todoList.append(todo);
    todoInput.value = "";
    submitButton.disabled = true;
}
function removeTodo(index) {
    todos.splice(index, 1);
    todoList === null || todoList === void 0 ? void 0 : todoList.childNodes[index].remove();
}
function updateTodo(index, description) {
    todos[index] = description;
    var todo = renderTodoInReadMode(description);
    todoList === null || todoList === void 0 ? void 0 : todoList.replaceChild(todo, todoList.childNodes[index]);
}
