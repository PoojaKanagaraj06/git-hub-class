document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage if available
    loadTasks();

    addTaskBtn.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskActions);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        createTaskElement(taskText, false); // false because it's not completed initially
        taskInput.value = '';
        saveTasks();
    }

    function createTaskElement(taskText, isCompleted) {
        const li = document.createElement('li');
        li.textContent = taskText;
        if (isCompleted) {
            li.classList.add('completed');
        }

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.classList.add('complete-btn');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn'); // Added a class for potential specific styling

        const buttonsDiv = document.createElement('div');
        buttonsDiv.appendChild(completeButton);
        buttonsDiv.appendChild(deleteButton);

        li.appendChild(buttonsDiv);
        taskList.appendChild(li);
        return li;
    }

    function handleTaskActions(event) {
        const target = event.target;
        const taskItem = target.closest('li');

        if (!taskItem) return;

        if (target.classList.contains('complete-btn')) {
            taskItem.classList.toggle('completed');
        } else if (target.classList.contains('delete-btn')) {
            taskItem.remove();
        }
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.firstChild.textContent, // Get text content, ignoring button texts
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(task => createTaskElement(task.text, task.completed));
        }
    }
});
