import {} from 'dotenv/config';
import handlebars from 'express-handlebars'
import express from 'express'
import { createServer } from "http";
import { Server } from "socket.io";
import getProducts from './createTableProd.js';
import Mensajes from './createTableMsg.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {normalize, schema} from 'normalizr'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import util from 'util'
function print (objeto) {
    console.log(util.inspect(objeto, false,12,true))
}

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
    }))
app.set('view engine', 'hbs')
app.set('views', './views')

const contMsg = new Mensajes('mensajes')

const schemaAuthor = new schema.Entity('author', {}, {idAttribute:'email'})

const schemaSingleMessage = new schema.Entity('singleMessage',{
    author: schemaAuthor
})

const schemaMessages = new schema.Entity('mensajes', {
    mensajes: [schemaSingleMessage]
})

app.get('/', async (req, res) => {
    res.render('main')
})

app.get('/api/productos-test', async (req, res) => {
    res.render('productos-test')
})

io.on('connection', async (socket) => {
    console.log('Nuevo usuario conectado')
    const products = [];
    for (let i=0; i < 5; i++) {
        products.push(getProducts(i+1))
    }
    io.sockets.emit('totalProducts', products);

    const messages = await contMsg.getAll();
    const normMessages = normalize(messages, schemaMessages)
    io.sockets.emit('totalMessages', normMessages);

    socket.on('newMessage', async (data) => {
        contMsg.save(data);
        const messages = await contMsg.getAll();
        const normMessages = normalize(messages, schemaMessages)
        io.sockets.emit('totalMessages', normMessages)
    })
})

httpServer.listen(process.env.PORT, () => {
    console.log(`Escuchando en el port ${httpServer.address().port}`)
})
httpServer.on('error', error => console.log(`Error: ${error}`))
