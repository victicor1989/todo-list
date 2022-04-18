console.log("Module loaded!")
let todos = [];
let $tituloPpal = document.querySelector("#titulo-ppal")
let $tasksCounter = document.querySelector("#contador-tareas-pendientes")
let $newTaskForm = document.querySelector(".new-task-form")
let $resetFormButton = document.querySelector(".clear-button")
let $taskList = document.querySelector(".tasks-list")
let $newTask = document.querySelector(".caja-de-text")

window.addEventListener("load", function() {
    const savedTodos = JSON.parse(window.localStorage.getItem("todos"))
    todos = savedTodos || [] // En caso de que saved todos sea "null" o "undefined" ponemos por defecto un array vacio
    renderDate()
    renderTodos()
})

$newTaskForm.addEventListener("submit",addTask) //addTask(event)

function addTask(event) {
    event.preventDefault()

    if($newTask.value  === "") {
        return // Detenemos la ejecuccion
    }

    let newTask = {
        id: new Date().getTime(),
        description: $newTask.value, // $newTask: referencia al input de HTML
        isDone: false

    }

    todos.push(newTask)
    saveTodos()
    renderTodos()
    $newTask.value = ""
}

function checkTask(posicion) {
  todos[posicion].isDone = todos[posicion].isDone === true ? false: true;
  saveTodos()
  renderTodos()
}

function removeTask(posicion) {
    console.log(posicion)
    todos = todos.filter(function(_, indice) {
        return indice !== posicion
    })
    saveTodos()
    renderTodos()
}

function renderDate(){
    const daysOfWeek = ["Domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const date = new Date()
    const day = date.getDate()
    const dayOfWeek = daysOfWeek[date.getDay()]
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    $tituloPpal.innerHTML = `${dayOfWeek}, ${day} ${month} ${year}`
    

}

function renderPendingTasks() {
    const PendingTasksArray = todos.filter(function(task) {
        const noEstanTerminada = task.isDone === false
        return noEstanTerminada
    })
     
    const counterPendingTasks = PendingTasksArray.length
    $tasksCounter.innerHTML =  `${counterPendingTasks} ${counterPendingTasks > 1 ? "Tareas pendientes" : "Tarea pendiente"}`
}

function saveTodos() {
    window.localStorage.setItem("todos", JSON.stringify(todos))
}

function renderTodos() {
    renderPendingTasks()
    $taskList.innerHTML = ""
    // renderedTask es un ARRAY que retorna todos.map
    // renderedTasks es un ARRAY que retorna todos.map
    let resultTasks = todos.map(function(task) {
        return `
        <li class="task-list-item">
            <button class="button-list check-task-button" >
                <i 
                class="fa-regular fa-circle-check ${task.isDone === true ? "fa-circle-check-done" : ""}"
                ></i>
            </button>
                <span class="task-description">
                    ${task.description}
                </span>
            <button type="button" class="button-list remove-task-button">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </li> 
        `
     }) 
    // Resultado de las tareas unidas
     $taskList.innerHTML = resultTasks.join("")

    const $checkButtons = document.querySelectorAll(".check-task-button")
    $checkButtons.forEach(function($checkButton, posicion) {
        $checkButton.addEventListener("click", function(){ 
            checkTask(posicion) 
        })
    })

    const $removeButtons = document.querySelectorAll(".remove-task-button")
    console.log($removeButtons)
    $removeButtons.forEach(function($removeButton, posicion) {
        $removeButton.addEventListener("click", function() {
            removeTask(posicion)
        })
    })
}
