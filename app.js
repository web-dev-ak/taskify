const inputBox = document.getElementById('input-box');
const addTaskBtn = document.getElementById('add-task-btn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks on the page
const renderTasks = () => {
    // Clear the current lists
    taskListBoxPending.innerHTML = '';
    taskListBoxCompleted.innerHTML = '';

    // Placeholder spans for no tasks
    const pendingPlaceholder = document.createElement('span');
    pendingPlaceholder.textContent = 'No tasks are pending.';
    const completedPlaceholder = document.createElement('span');
    completedPlaceholder.textContent = 'No tasks are completed.';

    let hasPendingTasks = false;
    let hasCompletedTasks = false;

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task');

        // Create task text
        const taskTitle = document.createElement('span');
        taskTitle.textContent = task.title;
        taskItem.appendChild(taskTitle);

        // Create task control buttons
        const taskControlBtn = document.createElement('div');
        taskControlBtn.classList.add('task-cntrl-btn');

        // Star button
        const starBtn = document.createElement('button');
        starBtn.innerHTML = `<i class="${task.completed ? 'fa-solid' : 'fa-regular'} fa-star" style="${task.completed ? 'color: var(--primary);' : ''}"></i>`;
        starBtn.addEventListener('click', () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        // Trash button
        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        trashBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        taskControlBtn.appendChild(starBtn);
        taskControlBtn.appendChild(trashBtn);
        taskItem.appendChild(taskControlBtn);

        // Append to the appropriate list and set flags for placeholders
        if (task.completed) {
            taskListBoxCompleted.appendChild(taskItem);
            hasCompletedTasks = true;
        } else {
            taskListBoxPending.appendChild(taskItem);
            hasPendingTasks = true;
        }
    });

    // Show placeholder text if no tasks
    if (!hasPendingTasks) {
        taskListBoxPending.appendChild(pendingPlaceholder);
    }
    if (!hasCompletedTasks) {
        taskListBoxCompleted.appendChild(completedPlaceholder);
    }
};

// Function to save tasks to local storage
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Add new task
addTaskBtn.addEventListener('click', () => {
    const taskText = inputBox.value.trim();
    if (taskText) {
        tasks.push({ title: taskText, completed: false });
        saveTasks();
        renderTasks();
        inputBox.value = '';
    }
});

// Load tasks on page load
document.addEventListener('DOMContentLoaded', renderTasks);

// APP WORKING LOGICS
// Task Completed Icon UI Icon Swap
const starIconOutline = document.getElementById('star-icon-ouline');
const starIconFilled = document.getElementById('star-icon-filled');
const taskCompleteBtn = document.getElementById('task-completed-btn');

let taskCompleted = false;

taskCompleteBtn.addEventListener('click', () => {
    if (starIconOutline.style.display == 'block') {
        starIconOutline.style.display = 'none';
        starIconFilled.style.display = 'block';

        taskCompleted = true;
        console.log(taskCompleted)
    }
    else if (starIconFilled.style.display == 'block') {
        starIconFilled.style.display = 'none';
        starIconOutline.style.display = 'block';

        taskCompleted = false;
        console.log(taskCompleted)
    }
})

// DYNAMIC TAGLINE
const taglineChanging = document.getElementById('tagline-changing');
const words = ['Smart', 'Better', 'Efficient'];
let wordIndex = 0;

setInterval(() => {
    taglineChanging.textContent = words[wordIndex];
    wordIndex = (wordIndex + 1) % words.length;
}, 2000);

// TASK MODE SWITCH 
const pendingTaskBtn = document.getElementById('task-pending-box');
const completedTaskBtn = document.getElementById('task-completed-box');

const taskListBoxPending = document.getElementById('task-list-box-pending');
const taskListBoxCompleted = document.getElementById('task-list-box-completed');

let taskMode = 'pending';

completedTaskBtn.addEventListener('click', () => {
    if (taskMode === 'pending') {
        completedTaskBtn.style.backgroundColor = 'var(--selected)';
        completedTaskBtn.style.border = '1px solid var(--bdr-25)';

        pendingTaskBtn.style.backgroundColor = 'transparent';
        pendingTaskBtn.style.border = 'none';

        taskListBoxPending.style.display = 'none';
        taskListBoxCompleted.style.display = 'flex';

        taskMode = 'completed';
        console.log(taskMode)
    }
});

pendingTaskBtn.addEventListener('click', () => {
    if (taskMode === 'completed') {
        completedTaskBtn.style.backgroundColor = 'transparent';
        completedTaskBtn.style.border = 'none';

        pendingTaskBtn.style.backgroundColor = 'var(--selected)';
        pendingTaskBtn.style.border = '1px solid var(--bdr-25)';

        taskListBoxPending.style.display = 'flex';
        taskListBoxCompleted.style.display = 'none';

        taskMode = 'pending';
        console.log(taskMode)
    }
});

// THEME SWITCH
const themeSwitchBtn = document.getElementById('theme-switch-btn');
const lightModeIcon = document.getElementById('light-mode-icon');
const darkModeIcon = document.getElementById('dark-mode-icon');

function isVisible(element) {
    return getComputedStyle(element).display !== 'none';
}

themeSwitchBtn.addEventListener('click', () => {
    if (isVisible(lightModeIcon)) {
        darkModeIcon.style.display = 'block';
        lightModeIcon.style.display = 'none';
        document.querySelector("html").setAttribute("data-theme", "dark");
        localStorage.setItem('data-theme', 'dark');
    }
    else {
        darkModeIcon.style.display = 'none';
        lightModeIcon.style.display = 'block';
        document.querySelector("html").setAttribute("data-theme", "light");
        localStorage.setItem('data-theme', 'light');
    }
});

window.onload = function () {
    const savedTheme = localStorage.getItem('data-theme');

    if (savedTheme) {
        document.querySelector("html").setAttribute("data-theme", savedTheme);
        if (savedTheme === "dark") {
            darkModeIcon.style.display = 'block';
            lightModeIcon.style.display = 'none';
        } else {
            darkModeIcon.style.display = 'none';
            lightModeIcon.style.display = 'block';
        }
    }
};