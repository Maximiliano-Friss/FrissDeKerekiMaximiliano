require('dotenv').config()
const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')
const app = express()
const httpServer = new HttpServer (app)
const io = new IOServer(httpServer)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const handlebars = require('express-handlebars')
app.use(express.static('public'))
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
    }))
app.set('view engine', 'hbs')
app.set('views', './views')
const Contenedor = require('./classContenedor.js')
const Mensajes = require('./classMensajes.js')
const cont = new Contenedor('Productos');
const chat = new Mensajes('Chat');

app.get('/', async (req, res) => {
    const products = await cont.getAll();
    const full = products.length > 0;
    res.render('main', {full})
})

io.on('connection', async (socket) => {
    console.log('Nuevo usuario conectado')

    const products = await cont.getAll();
    const messages = await chat.getAll();
    io.sockets.emit('totalProducts', products);
    io.sockets.emit('totalMessages', messages);

    socket.on('newProduct', async (data) => {
        cont.save(data);
        const products = await cont.getAll();
        io.sockets.emit('totalProducts', products)
    })

    socket.on('newMessage', async (data) => {
        chat.save(data);
        const messages = await chat.getAll();
        io.sockets.emit('totalMessages', messages)
    })
})


httpServer.listen(process.env.PORT, () => {
    console.log(`Escuchando en el port ${httpServer.address().port}`)
})
httpServer.on('error', error => console.log(`Error: ${error}`))
