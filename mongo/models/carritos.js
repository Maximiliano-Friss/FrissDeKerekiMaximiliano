//schema de carritos de mongo dbs

import mongoose from "mongoose";

const carritosCollection = 'carritos';

const CarritoSchema = new mongoose.Schema({
    productos: {type: Array}
}, {timestamps: true})

export const carritos = mongoose.model(carritosCollection, CarritoSchema)