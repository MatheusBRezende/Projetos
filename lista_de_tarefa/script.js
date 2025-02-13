const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

addTaskButton.addEventListener('click', () =>{
    const taskText = taskInput.value;
    if(taskText !== ''){
        const newTask = document.createElement('li');
        newTask.textContent = taskText;
        taskList.appendChild(newTask);
        taskInput.value = '';
    }
})

taskList.addEventListener('click', (event) => {
    if(event.target.tagName === 'LI'){
        event.target.classList.toggle('done')
    }
})