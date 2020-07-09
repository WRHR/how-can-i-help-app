
function createTaskList({data}){
    return data.map(createTask)
}

function displayTasks(tasks){
    return tasks.forEach(task => taskList.append(task))
}

function createTask(task){
    console.log(task)
    const li = document.createElement('li')
    li.dataset.taskId = task.id
    li.innerHTML = `
        <h2 class='task-title'>${task.attributes.title}</h2>
        <h4>${task.attributes.creator.data.attributes.name} needs help:</h4>
        <p>${task.attributes.description}</p>
    `
    return li
}

export {createTaskList}