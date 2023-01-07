//schema de mensaje de mongodb

import mongoose from "mongoose";

const mensajesCollection = 'mensajes';

const MensajeSchema = new mongoose.Schema({
    nombre: {type: String, require: true, max: 100},
    precio: {type: Number, require: true},
    foto: {type: String, require: true},
    descripcion: {type: String, max: 1000},
    stock: {type: Number, require: true},
    codigo: {type: String, max: 50}
}, {timestamps: true})

export const mensajes = mongoose.model(mensajesCollection, MensajeSchema)