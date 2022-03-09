console.log("Module loaded!")
let $tituloPpal = document.querySelector("#titulo-ppal")
let $tasksCounter = document.querySelector("#contador-tareas-pendientes")
let $newTaskForm = document.querySelector(".new-task-form")
let $resetFormButton = document.querySelector(".clear-button")
let $taskList = document.querySelector(".tasks-list")

let todos = [
    {
        id: 1646783976958,
        description: "Practicar mucho JavaScript",
        isDone: false
    },
    {
        id: 1646783976952,
        description: "Aprender funciones del Array en JS",
        isDone: false
    }
];

function renderTodos() {
    $taskList.innerHTML = ""

    // renderedTasks es un ARRAY que retorna todos.map
    let renderedTasks = todos.map(function(task) {
        return `
        <li class="task-list-item">
            <button class="button-list check-task-button">
                <i class="fa-regular fa-circle-check"></i>
            </button>
                <span class="task-description">
                    ${task.description}
                </span>
            <button type="button" class="button-list remove-task-button">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </li> `
     }) 
     
     $taskList.innerHTML = renderedTasks.join("")
}

renderTodos()