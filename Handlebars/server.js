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

const { options } = require('./options/mysqlconn.js')
const { options2 } = require('./options/sqlite3conn.js')
const ClienteMysql = require('./mysqlContainer.js')
const ClienteSqlite3 = require('./sqlite3Container.js')
const clientMySql = new ClienteMysql(options);
const clientSqlite3 = new ClienteSqlite3(options2);

app.get('/', async (req, res) => {
    const products = await clientMySql.getAll();
    const full = products.length > 0;
    res.render('main', {full})
})

io.on('connection', async (socket) => {
    console.log('Nuevo usuario conectado')
    const products = await clientMySql.getAll();
    const messages = await clientSqlite3.getAll();
    io.sockets.emit('totalProducts', products);
    io.sockets.emit('totalMessages', messages);

    socket.on('newProduct', async (data) => {
        clientMySql.save(data);
        const products = await clientMySql.getAll();
        io.sockets.emit('totalProducts', products)
    })

    socket.on('newMessage', async (data) => {
        clientSqlite3.save(data);
        const messages = await clientSqlite3.getAll();
        io.sockets.emit('totalMessages', messages)
    })
})

httpServer.listen(process.env.PORT, () => {
    console.log(`Escuchando en el port ${httpServer.address().port}`)
})
httpServer.on('error', error => console.log(`Error: ${error}`))
