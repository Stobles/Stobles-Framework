const todos = ["Погулять с лаймой", "Откликнуться на вакансии"];

const todoInput: HTMLInputElement = document.getElementById(
  "todo-text"
) as HTMLInputElement;
const submitButton: HTMLButtonElement = document.getElementById(
  "add-todo"
) as HTMLButtonElement;
const todoList = document.getElementById("todo-list");

for (const todo of todos) {
  todoList?.append(renderTodoInReadMode(todo));
}

todoInput?.addEventListener("input", () => {
  submitButton.disabled = todoInput.value.length < 3;
});

todoInput.addEventListener("keydown", ({ key }) => {
  if (key === "Enter" && todoInput.value.length >= 3) {
    addTodo();
  }
});

submitButton.addEventListener("click", () => {
  addTodo();
});

function renderTodoInReadMode(todo: string): HTMLElement {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = todo;
  span.addEventListener("dblclick", () => {
    console.log("mek");
    const idx = todos.indexOf(todo);
    todoList?.replaceChild(
      renderTodoInEditMode(todo),
      todoList.childNodes[idx]
    );
  });
  li.append(span);
  const button = document.createElement("button");
  button.textContent = "Done";
  button.addEventListener("click", () => {
    const idx = todos.indexOf(todo);
    removeTodo(idx);
  });
  li.append(button);
  return li;
}

function renderTodoInEditMode(todo: string): HTMLElement {
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.type = "text";
  input.value = todo;
  li.append(input);
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.addEventListener("click", () => {
    const idx = todos.indexOf(todo);
    updateTodo(idx, input.value);
  });
  li.append(saveBtn);
  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", () => {
    const idx = todos.indexOf(todo);
    todoList?.replaceChild(
      renderTodoInReadMode(todo),
      todoList.childNodes[idx]
    );
  });
  li.append(cancelBtn);
  return li;
}

function addTodo() {
  const description = todoInput.value;
  todos.push(description);
  const todo = renderTodoInReadMode(description);
  todoList?.append(todo);
  todoInput.value = "";
  submitButton.disabled = true;
}
function removeTodo(index: number) {
  todos.splice(index, 1);
  todoList?.childNodes[index].remove();
}
function updateTodo(index: number, description: string) {
  todos[index] = description;
  const todo = renderTodoInReadMode(description);
  todoList?.replaceChild(todo, todoList.childNodes[index]);
}
