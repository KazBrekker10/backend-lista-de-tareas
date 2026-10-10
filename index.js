//Fundamental para servidor con express
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
//activar express y herramientas
app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));

//Lista de tareas

let tasks = [];


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));
})


app.get('/API/tasks',(req,res)=>{
    res.json(tasks);
})
//inicio del sistema POST

app.post('/API/tasks',(req,res)=>{
    const newTask = req.body;
    console.log(`nueva tarea recibida: ${newTask.value}`);
    newTask.id = tasks.length+1;
    console.log(tasks);
    tasks.push(newTask);
    res.status(201).json({message:"tarea añadida exitosamente", task:newTask, tasks})
})

app.delete('/API/tasks/:id',(req,res)=>{
    const deleteTaskId = Number(req.params.id);
    tasks = tasks.filter(e=> e.id !== deleteTaskId);
    console.log(tasks);
    res.json({message:`tarea eliminada`, tasksList : tasks});
})

app.p

//ruta respuesta JSON con get
/*FUNDAMENTAL PARA EL SERVIDOR */
//port del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("servidor escuchando");
})