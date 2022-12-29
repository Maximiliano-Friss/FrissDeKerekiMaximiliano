import { Router } from 'express';
import {} from 'dotenv/config';
//CAMBIAR EL IMPORT CORRESPONDIENTE PARA ALTERNAR ENTRE MONGODB, FIREBASE Y ARCHIVOS.

//MONGODB:
// import Productos from "../clases/mongodbClases/classProductos.js"

//FIREBASE:
import Productos from "../clases/firebaseClases/classProductos.js"

//ARCHIVOS:
// import Productos from '../clases/archivosClases/classProductos.js';

const routerProductos = Router()
const cont = new Productos('Productos');

// Permisos de ADMIN
const administrador = true;
//

routerProductos.get('/', async (req, res) => {
    const products = await cont.getAll();
    console.log(products)
    res.json(products);
})

routerProductos.get('/:id', async (req, res) => {
    const selectedProduct = await cont.getById(req.params.id);
    res.json(selectedProduct);
})

routerProductos.post('/', async (req, res) => {
    if(!administrador) {
        res.json({error: `-2`, descripcion: `Ruta no autorizada`});
    } else {
        const newProduct = await cont.save(req.body);
        res.json(newProduct);
    }
})

routerProductos.put('/:id', async (req, res) => {
    if(!administrador) {
        res.json({error: `-2`, descripcion: `Ruta no autorizada`});
    } else {
        const {id} = req.params;
        const updatedProduct = await cont.update(id, req.body);
        res.json(updatedProduct);
    }
})

routerProductos.delete('/:id', async (req, res) => {
    if(!administrador) {
        res.json({error: `-2`, descripcion: `Ruta no autorizada`});
    } else {
    const {id} = req.params;
    const selectedProduct = await cont.getById(req.params.id);
    await cont.deleteById(id);
    res.json({eliminado: selectedProduct.nombre});
    }
})

routerProductos.delete('/', async (req, res) => {
    if(!administrador) {
        res.json({error: `-2`, descripcion: `Ruta no autorizada`});
    } else {
    await cont.deleteAll();
    res.json('Se eliminan todos los productos');
    }
})

export default routerProductos