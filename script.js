document.addEventListener('DOMContentLoaded', (event) => {
    const themeSelector = document.getElementById('theme-selector');
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.theme-selector-container')) {
            themeSelector.style.display = 'none';
        }
    });
});

function toggleThemeSelector() {
    const themeSelector = document.getElementById('theme-selector');
    themeSelector.style.display = themeSelector.style.display === 'block' ? 'none' : 'block';
}

function changeTheme(theme) {
    const root = document.documentElement;
    switch (theme) {
        case 'default':
            root.style.setProperty('--background-color', '#ffffff');
            root.style.setProperty('--primary-color', '#2980b9');
            break;
        case 'darkblue':
            root.style.setProperty('--background-color', '#2c3e50');
            root.style.setProperty('--primary-color', '#2980b9');
            break;
        case 'darkred':
            root.style.setProperty('--background-color', '#3e2c50');
            root.style.setProperty('--primary-color', '#b92929');
            break;
        case 'darkgreen':
            root.style.setProperty('--background-color', '#2c503e');
            root.style.setProperty('--primary-color', '#29b95c');
            break;
        case 'darkpurple':
            root.style.setProperty('--background-color', '#503e50');
            root.style.setProperty('--primary-color', '#9529b9');
            break;
    }
    document.body.style.backgroundColor = getComputedStyle(root).getPropertyValue('--background-color');
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.style.backgroundColor = getComputedStyle(root).getPropertyValue('--primary-color');
    });
}

function addTask() {
    const taskText = document.getElementById('new-task').value;
    const dueDate = document.getElementById('due-date').value;
    const dueTime = document.getElementById('due-time').value;
    if (!taskText) return; // Task should not be added if input field is empty
    const taskList = document.getElementById('task-list');

    const taskItem = document.createElement('li');

    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.value = `${taskText} - Due: ${dueDate} ${dueTime}`;
    taskInput.disabled = true;

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.onclick = () => {
        taskInput.disabled = !taskInput.disabled;
    };

    const completeButton = document.createElement('button'); // Create complete button
    completeButton.innerText = 'Complete'; // Assign text
    completeButton.onclick = () => {
        taskInput.style.textDecoration = 'line-through'; // Strikethrough effect
        taskInput.disabled = true; // Disable input
    };

    taskItem.appendChild(taskInput);
    taskItem.appendChild(editButton);
    taskItem.appendChild(completeButton); // Append complete button
    taskList.appendChild(taskItem);

    taskInput.addEventListener('input', (event) => {
        taskItem.dataset.text = taskInput.value;
    });

    document.getElementById('new-task').value = '';
    document.getElementById('due-date').value = '';
    document.getElementById('due-time').value = '';
}

function toggleTasks() {
    const taskList = document.getElementById('task-list');
    taskList.classList.toggle('hidden');
}

function checkTasks() {
    const tasks = document.querySelectorAll('#task-list li');
    const now = new Date();
    tasks.forEach(task => {
        const taskText = task.querySelector('input[type="text"]').value;
        const dueDate = new Date(taskText.split(' - Due: ')[1]);
        if (dueDate <= now) { // Check if task is due
            const taskInput = task.querySelector('input[type="text"]');
            taskInput.style.textDecoration = 'line-through'; // Strikethrough effect
            taskInput.disabled = true; // Disable input
        }
    });
}

setInterval(checkTasks, 60000); // Check every minute
