const URL = "http://localhost:3000/"
const taskList = document.querySelector(".tasks-list");
const addTasks = document.querySelector(".add-tasks");

const tasks = [];

const noTasksCard = ` <li class="no-task">
            <p>No hay tareas disponibles</p>`


async function deleteTask(value,id){    
    const url = `${URL}API/tasks/${id}`;
    const taskDelete =  await fetch(url,{
        method:"DELETE"
    });
    const taskData = await taskDelete.json();
    console.log(taskData);
    renderTaskList(taskData.tasksList);
    /*taskNode.addEventListener("click",(e)=>{
        const taskIndex = tasks.findIndex(e=> e===task)
        tasks.splice(taskIndex,1);
        taskNode.parentNode.remove();
        if (taskList.childNodes.length === 0){
            taskList.innerHTML += noTasksCard;

        }
    })*/
    
}

function tastkCard(task){
    const {value,id}= task
    const taskHTML = `<li class="task">
        <p>
            ${value}
        </p>
        <button onClick="deleteTask('${value}',${id})">
            <i class="fa-solid fa-trash-can"></i>
        </button>
    </li>`
    /*const taskElement = document.createElement("li");
    const taskText = document.createElement("p");
    const taskButton = document.createElement("button");
    taskText.innerHTML = value;
    deleteTask(taskButton,value);
    taskButton.innerHTML += `<i class="fa-solid fa-trash-can"></i>`;
    taskElement.classList.add("task");
    taskElement.appendChild(taskText);
    taskElement.appendChild(taskButton);*/        
    return taskHTML;
}

function renderTaskList(tasks){
    taskList.innerHTML = "";
    if(tasks.length > 0){
        tasks.forEach(task=> {
            taskList.innerHTML += tastkCard(task);
        })
        return;
    }
    taskList.innerHTML += noTasksCard;
    return
}



addTasks.addEventListener("submit",(e)=>{
    e.preventDefault();
    const {value} = e.target.tasks;
    e.target.tasks.value = "";
    if(value){tasks.push(value);
      addTask(value);
    }

})

async function getTasks(){
    const tasksJSON = await fetch(`${URL}API/tasks`);
    const tasks = await tasksJSON.json();
    console.log(tasks.length)
    renderTaskList(tasks);
}

async function addTask(value){
    console.log(value)
    const taskData = await fetch(`${URL}API/tasks`,{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({value:value})
    })
    const taskResponse = await taskData.json();
    const {tasks} = taskResponse;
    renderTaskList(tasks);
}

getTasks();
