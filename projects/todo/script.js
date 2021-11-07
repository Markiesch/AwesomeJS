// Selecting DOM elements
const noTodoContainer = document.querySelector(".no-todos");
const noTodoInput = noTodoContainer.querySelector("input");
const noTodoCreate = noTodoContainer.querySelector("button");

const contentContainer = document.querySelector(".todo--section");
const todoInput = contentContainer.querySelector("input");
const todoCreate = contentContainer.querySelector("button");
const todoContainer = document.querySelector(".todos");
const doneContainer = document.querySelector(".done-todos");

const ALL_TODOS_DONE = `
<div class='all-todos-done'>
  <div>
    <img src='assets/all-todos-done.svg' />
  </div>
  <div>
    <h2>Woohoo, zero todos!</h2>
    <p>You have no todos left, todos will appear here when created.</p>
  </div>
</div>`;

let todoData = [];

if (localStorage.getItem("todos")) todoData = JSON.parse(localStorage.getItem("todos"));

// initialize eventlisteners
noTodoCreate.addEventListener("click", () => createTodo(noTodoInput.value));
noTodoInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    createTodo(noTodoInput.value);
    noTodoInput.value = "";
  }
});

todoCreate.addEventListener("click", () => createTodo(todoInput.value));
todoInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    createTodo(todoInput.value);
    todoInput.value = "";
  }
});

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todoData));
  renderTodos();
}

function createTodo(content = "") {
  const id = todoData.reduce((prev, current) => {
    if (current.id >= prev) return current.id + 1;
  }, 0);

  todoData.push({ content, id, done: false });

  saveTodos();
}

function toggleDone(id) {
  const target = todoData.find((todo) => todo.id === id);
  target.done = !target.done;
  saveTodos();
}

function deleteTodo(targetId) {
  const targetIndex = todoData.indexOf(todoData.find((todo) => todo.id === targetId));
  todoData.splice(targetIndex, 1);
  saveTodos();
}

function renderTodos() {
  if (!todoData.length) {
    noTodoContainer.style.display = "flex";
    contentContainer.style.display = "none";
    return;
  }

  noTodoContainer.style.display = "none";
  contentContainer.style.display = "block";

  const todos = todoData.filter((todo) => !todo.done);
  const doneTodos = todoData.filter((todo) => todo.done);

  todoContainer.innerHTML = todos.length ? "" : ALL_TODOS_DONE;
  doneContainer.innerHTML = "";

  for (const todo of todos) todoContainer.innerHTML += createTodoEl(todo);
  for (const todo of doneTodos) doneContainer.innerHTML += createTodoEl(todo);
}

function createTodoEl(todo) {
  return `
  <article>
    <div><h3>${todo.content}</h3></div>
    <div class="button--container">
      <button class="delete--button" onclick="deleteTodo(${todo.id})">
        <svg viewBox="0 0 448 512">
          <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z">
          </path>
        </svg>
      </button>
      <button ${todo.done ? "class='done'" : ""} onclick="toggleDone(${todo.id})">
        <svg viewBox="0 0 448 512">
          <path d="M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z">
          </path>
        </svg>
      </button>
    </div>
  </article>`;
}

// Initial setup
renderTodos();
