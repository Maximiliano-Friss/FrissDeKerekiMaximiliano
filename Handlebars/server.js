import {} from 'dotenv/config';
import handlebars from 'express-handlebars'
import express from 'express'
import { createServer } from "http";
import { Server } from "socket.io";
import getProducts from './createTableProd.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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


// const Cliente = require('./dbContainer.js')
// const clientMySql = new Cliente(options, 'productos');
// const clientSqlite3 = new Cliente(options2, 'mensajes');

app.get('/', async (req, res) => {
    const products = await clientMySql.getAll();
    const full = products.length > 0;
    res.render('main', {full})
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
    console.log(products)
    io.sockets.emit('totalProducts', products);
    // const messages = await clientSqlite3.getAll();
    // io.sockets.emit('totalMessages', messages);

    // socket.on('newMessage', async (data) => {
    //     clientSqlite3.save(data);
    //     const messages = await clientSqlite3.getAll();
    //     io.sockets.emit('totalMessages', messages)
    // })
})

httpServer.listen(process.env.PORT, () => {
    console.log(`Escuchando en el port ${httpServer.address().port}`)
})
httpServer.on('error', error => console.log(`Error: ${error}`))
