const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Add task when button is clicked
addTaskBtn.addEventListener('click', addTask);

// Add task on Enter key press
taskInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const listItem = document.createElement('li');
  listItem.className = 'task-item';

  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;

  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'task-actions';

  const completeBtn = document.createElement('button');
  completeBtn.textContent = '✔️';
  completeBtn.title = 'Mark as complete';
  completeBtn.onclick = () => {
    listItem.classList.add('completed');
    listItem.style.backgroundColor = '#d4edda';
    taskSpan.style.color = 'green';
    alert('✅ Task completed successfully!');
    
    // Automatically delete the task after 2 seconds
    setTimeout(() => {
      listItem.style.transition = "opacity 0.5s";
      listItem.style.opacity = "0";
      setTimeout(() => taskList.removeChild(listItem), 500);
    }, 2000);
  };

  const editBtn = document.createElement('button');
  editBtn.textContent = '✏️';
  editBtn.title = 'Edit task';
  editBtn.onclick = () => {
    const newText = prompt('Edit your task:', taskSpan.textContent);
    if (newText) taskSpan.textContent = newText;
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️';
  deleteBtn.title = 'Delete task';
  deleteBtn.onclick = () => {
    listItem.style.backgroundColor = '#f8d7da';
    setTimeout(() => {
      taskList.removeChild(listItem);
      alert('🗑️ Task deleted successfully!');
    }, 500);
  };

  actionsDiv.appendChild(completeBtn);
  actionsDiv.appendChild(editBtn);
  actionsDiv.appendChild(deleteBtn);

  listItem.appendChild(taskSpan);
  listItem.appendChild(actionsDiv);
  taskList.appendChild(listItem);

  taskInput.value = '';
}
