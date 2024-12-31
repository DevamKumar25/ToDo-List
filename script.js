document.addEventListener('DOMContentLoaded', () => {
const todoInput = document.getElementById("todo-input");
const todoList =    document.getElementById("todo-list");
const addTaskButton =   document.getElementById("add-task-btn");



let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

tasks.forEach(task => renderTasks(task))

addTaskButton.addEventListener("click", () => {
    
    const taskText = todoInput.value.trim();
    if(taskText==""){
        todoInput.placeholder = "Please add some task.....";
        return;
    }

    const messageDiv = document.getElementById("message");
    messageDiv.classList.remove("hidden");  // Make the message visible

    // Hide the message after 2 seconds
    setTimeout(() => {
        messageDiv.classList.add("hidden");
    }, 1000);

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    }

    tasks.push(newTask);
    saveTask();
    renderTasks(newTask);
    todoInput.value = "" ; //clear Input
    console.log(tasks);


});


// pick up from the local storage and grab it on screen

function renderTasks(task) {
    const li = document.createElement("li");
    li.setAttribute('data-id', task.id);

    // Add the completed class based on task.completed
    const completedClass = task.completed ? 'line-through text-gray-500' : '';  // Add completed styling if the task is completed

    li.innerHTML = `
        <div class="flex justify-between items-center bg-white p-2 rounded-md shadow">
           
            <span class="flex-1 ${completedClass}">${task.text}</span>  
             <input type="checkbox" class="task-checkbox mr-4" ${task.completed ? 'checked' : ''} />  
            <button class="bg-red-500 text-white p-1 rounded hover:bg-red-600">delete</button>
        </div>
    `;

    // Get the checkbox element and add event listener
    const checkbox = li.querySelector('.task-checkbox');
    checkbox.addEventListener('change', (e) => {
        task.completed = e.target.checked; // Update task completion status
        li.querySelector('span').classList.toggle('line-through', task.completed);  // Apply or remove line-through
        li.querySelector('span').classList.toggle('text-gray-500', task.completed);  // Apply gray color for completed task
        saveTask();  // Save task after completion status update
    });

    // Handle delete button click
    li.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation();  // Prevent the task toggle from triggering when clicking delete
        tasks = tasks.filter(t => t.id !== task.id);  // Remove task from the tasks array
        li.remove();  // Remove the task from the UI
        saveTask();  // Save updated tasks list
    });

    todoList.appendChild(li);  // Append the new task to the todo list
}



function saveTask() {
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

})