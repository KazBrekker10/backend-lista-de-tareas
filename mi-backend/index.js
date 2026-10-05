//Fundamental para servidor con express
const express = require('express');
const cors = require('cors');
const turistcPlaces = require('./data/lugares-turisticos.json');
const app = express();

app.use(cors());
app.use(express.json());


//ruta raiz
app.get("/", (req,res)=>{
    res.send("hola desde Nodejs y express")
})

app.get('/productos', (req, res) => {
  res.json([
    { id: 1, nombre: 'Gelatina', precio:40 },
    {id:2, nombre:"Helado", precio:3.00},
    {id:3, nombre:"queso", precio:4.50}
]);
});

app.get("/turisticos",(req,res)=>{
    res.json(turistcPlaces);
})

//ruta respuesta JSON con get
/*FUNDAMENTAL PARA EL SERVIDOR */
//port del servidor
const PORT = 3000;
app.listen(PORT,()=>{
    console.log("servidor escuchando");
})