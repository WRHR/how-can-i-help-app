
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
        <h4>${task.attributes.creator.data.attributes.name} needs help:</h4>
        <h3>${task.attributes.title}</h3>
        <p>Needs ${task.attributes.volunteersNeeded - task.attributes.helpers.length} more people to help!</p>
    `

    li.addEventListener('click', showDetails)
    return li
}

function showDetails(){

}

export {createTaskList}