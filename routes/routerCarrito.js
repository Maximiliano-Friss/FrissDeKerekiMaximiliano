import { Router } from 'express';
import Carrito from '../persistencia/classCarrito.js'
import Contenedor from '../persistencia/classContenedor.js'

const routerCarrito = Router()
const cart = new Carrito('Carrito');
const cont = new Contenedor('Productos');

routerCarrito.post('/', async (req, res) => {
    const newCart = await cart.saveCart();
    res.json({alerta:`Se creó un nuevo carrito. Su id será ${newCart}`});
})

routerCarrito.delete('/:id', async (req, res) => {
    const selectedCart = await cart.getCartById(Number(req.params.id));
    await cart.deleteCartById(Number(req.params.id));
    res.json({eliminado: selectedCart});
})

routerCarrito.get('/:id/productos', async (req, res) => {
    const selectedCart = await cart.getCartById(Number(req.params.id))
    res.json(selectedCart.products);
})

routerCarrito.post('/:id/productos/:id_prod', async (req, res) => {
    const newProduct = await cont.getById(Number(req.params.id_prod))
    if(newProduct !== undefined){
        cart.saveProductToCart(Number(req.params.id), newProduct)
        res.json({agregado: `${newProduct.nombre} a carrito de ID ${Number(req.params.id)}`});
    } else {
        res.json({error: `No existen productos con id ${Number(req.params.id_prod)}`})
    }
})

routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    const deletedProduct = await cart.deleteProdById(Number(req.params.id), Number(req.params.id_prod));
    res.json({eliminado: `${deletedProduct.nombre} del carrito con id ${req.params.id}`});
})

export default routerCarrito