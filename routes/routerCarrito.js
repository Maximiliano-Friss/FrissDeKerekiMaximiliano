import { Router } from 'express';
//CAMBIAR EL IMPORT CORRESPONDIENTE PARA ALTERNAR ENTRE MONGODB, FIREBASE Y ARCHIVOS.

//MONGODB:
import Productos from "../clases/mongodbClases/classProductos.js"
import Carrito from "../clases/mongodbClases/classCarritos.js"

//FIREBASE:
// import Productos from "../clases/firebaseClases/classProductos.js"
// import Carrito from "../clases/firebaseClases/classCarritos.js"

//ARCHIVOS:
// import Carrito from '../clases/archivosClases/classCarrito.js'
// import Productos from '../clases/archivosClases/classProductos.js'


const routerCarrito = Router()
const cart = new Carrito('Carrito');
const cont = new Productos('Productos');


routerCarrito.post('/', async (req, res) => {
    const newCartId = await cart.saveCart();
    res.json({alerta:`Se creó un nuevo carrito. Su id será ${newCartId}`});
})

routerCarrito.delete('/:id', async (req, res) => {
    const selectedCart = await cart.getCartById(req.params.id);
    if(selectedCart !== undefined){
        await cart.deleteCartById(req.params.id);
        res.json({eliminado: `Se elimina el carrito con id ${req.params.id}`});
    } else {
        res.json({error: `No existen carritos con id ${req.params.id}`})
    }
})

routerCarrito.get('/:id/productos', async (req, res) => {
    const productsInCart = await cart.getCartById(req.params.id)
    if(productsInCart !== undefined){
        res.json(productsInCart)
    } else {
        res.json({error: `Ocurrió un error al intentar mostrar los productos del carrito con id ${req.params.id}`})
    }
})

routerCarrito.post('/:id/productos/:id_prod', async (req, res) => {
    const newProduct = await cont.getById(req.params.id_prod)
    if(newProduct !== undefined){
        await cart.saveProductToCart(req.params.id, newProduct)
        res.json({agregado: `${newProduct.nombre} a carrito de ID ${req.params.id}`});
    } else {
        res.json({error: `No existen productos con id ${req.params.id_prod}`})
    }
})

routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    const selectedProduct = await cont.getById(req.params.id_prod)
    await cart.deleteProdById(req.params.id, selectedProduct);
    res.json({eliminado: `${selectedProduct.nombre} del carrito con id ${req.params.id}`});
})

export default routerCarrito