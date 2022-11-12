require('dotenv').config()
const express = require('express')
const multer = require('multer')
const {Router} = express
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/static', express.static(__dirname + '/public'))
const Contenedor = require('./classContenedor.js')

const server = app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el port ${server.address().port}`)
})

app.get('/productos', async (req, res) => {
    const productos = await cont.getAll();
    res.send(productos);
})

app.get('/productoRandom', async (req, res) => {
    const productos = await cont.getAll();
    const randomNumber = Math.ceil(Math.random()*productos.length)
    const productoRandom = await cont.getById(randomNumber);
    res.send(productoRandom);
})

server.on('error', error => console.log(`Error: ${error}`))
