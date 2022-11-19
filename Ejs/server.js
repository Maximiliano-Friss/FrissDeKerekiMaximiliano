require('dotenv').config()
const express = require('express')
const {Router} = express
const app = express()
const routerProductos = Router()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/static', express.static(__dirname + '/public'))
const Contenedor = require('./classContenedor.js')
const cont = new Contenedor('Productos');

routerProductos.get('/', async (req, res) => {
    const products = await cont.getAll();
    res.json(products);
})

routerProductos.get('/:id', async (req, res) => {
    const selectedProduct = await cont.getById(Number(req.params.id))
    res.json(selectedProduct);
})

routerProductos.post('/', async (req, res) => {
    const newProduct = await cont.save(req.body);
    res.json(newProduct);
})

routerProductos.put('/:id', async (req, res) => {
    const {id} = req.params;
    const updatedProduct = await cont.update(id, req.body);
    res.json({actualizado: updatedProduct});
})

routerProductos.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const selectedProduct = await cont.getById(Number(req.params.id));
    await cont.deleteById(Number(id));
    res.json({eliminado: selectedProduct});
})

app.use('/api/productos', routerProductos)

const server = app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el port ${server.address().port}`)
})
server.on('error', error => console.log(`Error: ${error}`))
