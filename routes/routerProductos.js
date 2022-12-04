import { Router } from 'express';
import Contenedor from '../persistencia/classContenedor.js'

const routerProductos = Router()
const cont = new Contenedor('Productos');

// Permisos de ADMIN
const administrador = false;
//

routerProductos.get('/', async (req, res) => {
    const products = await cont.getAll();
    res.json(products);
})

routerProductos.get('/:id', async (req, res) => {
    const selectedProduct = await cont.getById(Number(req.params.id));
    res.json(selectedProduct);
})

routerProductos.post('/', async (req, res) => {
    if(!administrador) {
        res.json({error: 'Esta acción requiere permisos de administrador'});
    } else {
        const newProduct = await cont.save(req.body);
        res.json(newProduct);
    }
})

routerProductos.put('/:id', async (req, res) => {
    if(!administrador) {
        res.json({error: 'Esta acción requiere permisos de administrador'})
    } else {
        const {id} = req.params;
        const updatedProduct = await cont.update(id, req.body);
        res.json({actualizado: updatedProduct});
    }
})

routerProductos.delete('/:id', async (req, res) => {
    if(!administrador) {
        res.json({error: 'Esta acción requiere permisos de administrador'})
    } else {
    const {id} = req.params;
    const selectedProduct = await cont.getById(Number(req.params.id));
    await cont.deleteById(Number(id));
    res.json({eliminado: selectedProduct.nombre});
    }
})

export default routerProductos