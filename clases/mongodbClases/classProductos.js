import mongoose from 'mongoose';
import * as models from '../../mongo/models/productos.js'
import URL from '../../mongo/mongoConfig.js'

class Productos {
    constructor(name){
        this.name = name;
    }

    async mongoConnect() {
        await mongoose.set("strictQuery", false);

        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },console.log('Conectado a MongoDB Atlas'))
    }

    async save(product) {
        try{
            await this.mongoConnect()
            const newProd = await models.productos(product).save()
            console.log('Se guardó un nuevo producto')
            return newProd
        }
        catch(err){
            console.log(err)
        }
        finally{
            mongoose.disconnect()
        }
    }

    async update(id, updProduct) {
        try{
            await this.mongoConnect()
            const updatedProd = await models.productos.findByIdAndUpdate(id,{$set: updProduct},{new: true})
            console.log(`Se actualiza el producto con id: ${id}`)
            console.log(updatedProd)
            return updatedProd
        }
        catch(err){
            console.log(err)
        }
        finally{
            mongoose.disconnect()
        }
    }
    
    async getById(id) {
        try{
            await this.mongoConnect()
            const foundProd = await models.productos.findById(id)
            console.log(`Se devuelve el producto con id: ${id}`)
            return foundProd
        }
        catch(err){
            console.log(err)
        }
        finally{
            mongoose.disconnect()
        }
    }

    async getAll() {
        try{
            await this.mongoConnect()
            const allProd = await models.productos.find()
            console.log('Se leen todos los productos')
            return allProd
        }
        catch(err){
            console.log(err)
        }
        finally{
            mongoose.disconnect()
        }
    }

    async deleteById(id) {
        try{
            await this.mongoConnect()
            const delProd = await models.productos.findByIdAndDelete(id)
            console.log(`Se elimina el producto con id ${id}`)
            return delProd
        }
        catch(err){
            console.log(err)
        }
        finally{
            mongoose.disconnect()
        }
    }

    async deleteAll() {
        
        try{
            await this.mongoConnect()
            await models.productos.deleteMany({})
            console.log('Se eliminan todos los productos')
        }
        catch(err){
            console.log(err)
        }
        finally{
            mongoose.disconnect()
        }
    }
}

export default Productos