//Fundamental para servidor con express
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

//Lista de tareas

let tasks = [];


app.get('/API/tasks',(req,res)=>{
    res.json(tasks);
})
//inicio del sistema POST

app.post('/API/tasks',(req,res)=>{
    const newTask = req.body;
    console.log(`nueva tarea recibida: ${newTask.value}`);
    newTask.id = tasks.length+1;
    tasks.push(newTask);
    res.status(201).json({message:"tarea añadida exitosamente", task:newTask, tasks})
})

app.delete('/API/tasks/:id',(req,res)=>{
    const deleteTaskId = Number(req.params.id);
    tasks = tasks.filter(e=> e.id !== deleteTaskId);

    res.json({tasksList : tasks});
})

//ruta respuesta JSON con get
/*FUNDAMENTAL PARA EL SERVIDOR */
//port del servidor
const PORT = 3000;
app.listen(PORT,()=>{
    console.log("servidor escuchando");
})