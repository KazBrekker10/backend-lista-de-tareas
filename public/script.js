
const URL = "http://localhost:3000/";
const taskList = document.querySelector(".tasks-list");
const addTasks = document.querySelector(".add-tasks");

const noTasksCard = ` <li class="no-task">
            <p>No hay tareas disponibles</p>`

async function getTasks(){
    const tasksJSON = await fetch(`${URL}API/tasks`);
    const tasks = await tasksJSON.json();
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


async function deleteTask(value,id){    
    const url = `${URL}API/tasks/${id}`;
    const taskDelete =  await fetch(url,{
        method:"DELETE"
    });
    const taskData = await taskDelete.json();
    renderTaskList(taskData.tasksList);

    
}

function taskCard(task){
    const {value,id}= task
    return`<li class="task">
        <p>
            ${value}
        </p>
        <button onClick="deleteTask('${value}',${id})">
            <i class="fa-solid fa-trash-can"></i>
        </button>
    </li>`
       
   
}

function renderTaskList(tasks){
    taskList.innerHTML = "";
    if(tasks.length > 0){
        taskList.innerHTML += tasks.map(task=> tastkCard(task)).join("");
        return;
    }
    taskList.innerHTML = noTasksCard;
}

addTasks.addEventListener("submit",(e)=>{
    e.preventDefault();
    const {value} = e.target.tasks;
    e.target.tasks.value = "";
    if(value) addTask(value);
    

})




getTasks();
