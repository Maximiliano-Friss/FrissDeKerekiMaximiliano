import { Router } from 'express';
//CAMBIAR EL IMPORT CORRESPONDIENTE PARA ALTERNAR ENTRE MONGODB, FIREBASE Y ARCHIVOS.

//MONGODB:
import Productos from "../clases/mongodbClases/classProductos.js"
import Carrito from "../clases/mongodbClases/classCarritos.js"

//FIREBASE:

//ARCHIVOS:
// import Carrito from '../clases/archivosClases/classCarrito.js'
// import Productos from '../clases/archivosClases/classProductos.js'


const routerCarrito = Router()
const cart = new Carrito('Carrito');
const cont = new Productos('Productos');


routerCarrito.post('/', async (req, res) => {
    const newCart = await cart.saveCart();
    res.json({alerta:`Se creó un nuevo carrito. Su id será ${newCart}`});
})

routerCarrito.delete('/:id', async (req, res) => {
    const selectedCart = await cart.getCartById(req.params.id);
    if(selectedCart !== undefined){
        await cart.deleteCartById(req.params.id);
        res.json({eliminado: selectedCart});
    } else {
        res.json({error: `No existen carritos con id ${req.params.id}`})
    }
})

routerCarrito.get('/:id/productos', async (req, res) => {
    const selectedCart = await cart.getCartById(req.params.id)
    res.json(selectedCart.products);
})

routerCarrito.post('/:id/productos/:id_prod', async (req, res) => {
    const newProduct = await cont.getById(req.params.id_prod)
    if(newProduct !== undefined){
        cart.saveProductToCart(req.params.id, newProduct)
        res.json({agregado: `${newProduct.nombre} a carrito de ID ${req.params.id}`});
    } else {
        res.json({error: `No existen productos con id ${req.params.id_prod}`})
    }
})

routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    const deletedProduct = await cart.deleteProdById(req.params.id, req.params.id_prod);
    res.json({eliminado: `${deletedProduct.nombre} del carrito con id ${req.params.id}`});
})

export default routerCarrito