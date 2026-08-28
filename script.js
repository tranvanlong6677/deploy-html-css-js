const STORAGE_KEY = "todos";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const clearCompletedBtn = document.getElementById("clear-completed");
const filterBtns = document.querySelectorAll(".filter-btn");

let todos = loadTodos();
let currentFilter = "all";

function loadTodos() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function render() {
  list.innerHTML = "";

  const filtered = todos.filter((todo) => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  if (filtered.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-message";
    empty.textContent = "Không có công việc nào.";
    list.appendChild(empty);
  }

  filtered.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.completed ? " completed" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const span = document.createElement("span");
    span.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "✕";
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    li.append(checkbox, span, deleteBtn);
    list.appendChild(li);
  });

  const remaining = todos.filter((t) => !t.completed).length;
  itemsLeft.textContent = `${remaining} công việc còn lại`;
}

function addTodo(text) {
  todos.push({ id: Date.now(), text, completed: false });
  saveTodos();
  render();
}

function toggleTodo(id) {
  todos = todos.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  saveTodos();
  render();
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
  render();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTodo(text);
  input.value = "";
  input.focus();
});

clearCompletedBtn.addEventListener("click", () => {
  todos = todos.filter((t) => !t.completed);
  saveTodos();
  render();
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

render();
