const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
window.onload = () => {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTaskToDOM(task.text, task.completed));
};

// Add task
addBtn.addEventListener("click", () => {
  let taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }
  addTaskToDOM(taskText, false);
  saveTask(taskText, false);
  taskInput.value = "";
});

// Add task to DOM
function addTaskToDOM(taskText, completed) {
  let li = document.createElement("li");
  li.textContent = taskText;

  if (completed) li.classList.add("completed");

  // Toggle complete on click
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateTask(taskText, li.classList.contains("completed"));
  });

  // Delete button
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "deleteBtn";
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent toggle
    taskList.removeChild(li);
    removeTask(taskText);
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(text, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update task status
function updateTask(text, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(task =>
    task.text === text ? { text, completed } : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function removeTask(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}