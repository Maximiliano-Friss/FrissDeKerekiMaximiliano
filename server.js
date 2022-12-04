import {} from 'dotenv/config';
import express from 'express';
import routerProductos from './routes/routerProductos.js';
import routerCarrito from './routes/routerCarrito.js';
import path from 'path';
import {fileURLToPath} from 'url';

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/static', express.static(__dirname + '/public'));
app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

app.get('*', (req, res) => {
    res.json({error: `-1`, descripcion: `Ruta no implementada`})
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el port ${server.address().port}`);
})
server.on('error', error => console.log(`Error: ${error}`));
