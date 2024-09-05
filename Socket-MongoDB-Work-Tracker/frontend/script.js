const chat = document.querySelector(".chat");
const chatWindow = document.querySelector(".chat-window");
const taskForm = document.querySelector("#task-form");
const taskList = document.querySelector("#task-list");

let chatHistory = [];
let tasks = [];

// Initialize Socket.io
const socket = io();

// Handle receiving messages
socket.on("receive-messages", (data) => {
  const { chatHistory, username } = data || {};
  if (username !== undefined) updateUsername(username);
  renderChatHistory(chatHistory);
});

// Handle receiving tasks (if you decide to add task management over Socket.io)
socket.on("receive-tasks", (data) => {
  tasks = data || [];
  renderTasks();
});

// Handle chat form submission
chat.addEventListener("submit", function (e) {
  e.preventDefault();
  sendMessage(chat.elements.message.value);
  chat.elements.message.value = "";
});

// Send a chat message
async function sendMessage(message) {
  socket.emit("post-message", {
    message,
  });
}

// Render chat history
function renderChatHistory(chatHistory) {
  const html = chatHistory
    .map(({ username, message }) => messageTemplate(username, message))
    .join("\n");
  chatWindow.innerHTML = html;
}

// Update the displayed username
function updateUsername(username) {
  document.querySelector("h1").innerHTML = username;
}

// Create HTML for each chat message
function messageTemplate(username, message) {
  return `<div class="flex items-center">
            <div class="w-5 h-5 bg-green-400 text-white rounded-full flex items-center justify-center mr-2">
              <i class="fas fa-user"></i>
            </div>
        <p class="text-gray-100 text-lg">${username}: ${message}</p>
    </div>`;
}

// Handle task form submission
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(taskForm);
  const task = {
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    assignedTo: formData.get("assignedTo"),
    deadline: formData.get("deadline"),
  };
  await createTask(task);
  taskForm.reset();
});

// Create a new task
async function createTask(task) {
  try {
    const response = await fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const newTask = await response.json();
    tasks.push(newTask);
    renderTasks();
  } catch (error) {
    console.error('Error creating task:', error);
  }
}

// Fetch and render tasks
async function fetchTasks() {
  try {
    const response = await fetch('/tasks');
    tasks = await response.json();
    renderTasks();
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

// Render the list of tasks
function renderTasks() {
  const html = tasks
    .map(task => taskTemplate(task))
    .join("\n");
  taskList.innerHTML = html;
}

// Create HTML for each task
function taskTemplate({ title, description, status, assignedTo, deadline }) {
  return `<div class="task">
            <h3 class="text-xl font-semibold">${title}</h3>
            <p>${description}</p>
            <p>Status: ${status}</p>
            <p>Assigned To: ${assignedTo}</p>
            <p>Deadline: ${new Date(deadline).toLocaleDateString()}</p>
          </div>`;
}

// Initial fetch of tasks on page load
fetchTasks();