require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const handlebars = require('express-handlebars')
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
    }))
app.set('view engine', 'hbs')
app.set('views', './views')
app.use(express.static('public'))
const Contenedor = require('./classContenedor.js')
const cont = new Contenedor('Productos');

app.get('/', async (req, res) => {
    res.render('form')
})

app.get('/productos', async (req, res) => {
    const products = await cont.getAll();
    if (products.length>0){
        full = true;
    }
    res.render('products', {products, full});
})

app.post('/productos', async (req, res) => {
    cont.save(req.body);
    const products = await cont.getAll();
    if (products.length>0){
        full = true;
    }
    res.render('products', {products, full});
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el port ${server.address().port}`)
})
server.on('error', error => console.log(`Error: ${error}`))
