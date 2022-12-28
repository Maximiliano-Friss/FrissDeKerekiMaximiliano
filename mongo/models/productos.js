//schema de productos de mongo dbs

import mongoose from "mongoose";

const productosCollection = 'productos';

const ProductoSchema = new mongoose.Schema({
    nombre: {type: String, require: true, max: 100},
    precio: {type: Number, require: true},
    foto: {type: String, require: true},
    descripcion: {type: String, max: 1000},
    stock: {type: Number, require: true},
    codigo: {type: String, max: 50}
}, {timestamps: true})

export const productos = mongoose.model(productosCollection, ProductoSchema)