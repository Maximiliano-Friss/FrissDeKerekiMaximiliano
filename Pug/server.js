require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.static('public'))
const Contenedor = require('./classContenedor.js')
const cont = new Contenedor('Productos');

app.get('/', async (req, res) => {
    res.render('form.pug')
})

app.get('/productos', async (req, res) => {
    const products = await cont.getAll();
    res.render('products.pug', {productos: products});
})

app.post('/productos', async (req, res) => {
    await cont.save(req.body);
    const products = await cont.getAll();
    res.render('products.pug', {productos: products});
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el port ${server.address().port}`)
})
server.on('error', error => console.log(`Error: ${error}`))
