require('dotenv').config()
const express = require('express')
const multer = require('multer')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const Contenedor = require('./classContenedor.js')

const televisor = {
    title:'televisor',
    price: 599,
    thumbnail: 'https://images.samsung.com/is/image/samsung/p6pim/uy/un32t4310agxug/gallery/uy-hd-t4300-394450-un32t4310agxug-469950136?$650_519_PNG$',
}

const silla = {
    title:'silla',
    price: 49,
    thumbnail: 'https://f.fcdn.app/imgs/1a0055/www.divino.com.uy/div/765e/original/catalogo/240739001_0/1500-1500/silla-de-comedor-madera-acacia-ahf.jpg'
}

const cama = {
    title:'cama',
    price: 600,
    thumbnail: 'https://images.demandware.net/dw/image/v2/BBBV_PRD/on/demandware.static/-/Sites-master-catalog/default/dwc7c0575c/images/460000/461151.jpg?sfrm=jpg'
}

const cont = new Contenedor('Productos');
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