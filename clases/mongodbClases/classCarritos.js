import mongoose from 'mongoose';
import * as models from '../../mongo/models/carritos.js'
import URL from '../../mongo/mongoConfig.js'

class Carrito {
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

    async saveCart() {
        try{
            await this.mongoConnect()
            const newCart = await models.carritos().save()
            console.log(`Se creó un nuevo carrito con id: ${newCart._id}`)
            return newCart._id
        }
        catch(err){
            console.log(err)
        }
        finally{
            mongoose.disconnect()
        }
    }
    
    async deleteCartById(id) {
        try{
            await this.mongoConnect()
            const delCart = await models.carritos.findByIdAndDelete(id)
            console.log(`Se elimina el carrito con id ${id}`)
            return delCart
        }
        catch(err){
            console.log(err)
        }
        finally{
            mongoose.disconnect()
        }
    }

    async getCartById(id) {
        try{
            await this.mongoConnect()
            const productsInCart = await models.carritos.findById(id,{productos:1, _id:0})
            console.log(`Se devuelven los productos del carrito con id: ${id}`)
            return productsInCart.productos
        }
        catch(err){
            console.log(err)
        }
        finally{
            mongoose.disconnect()
        }
    }
    
    async saveProductToCart(id, product) {
        try{
            await this.mongoConnect()
            const newProd = await models.carritos.findByIdAndUpdate(id, {$push: {productos: product}})
            console.log(`Se guardó un nuevo producto en el carrito con id ${id}`)
            return newProd
        }
        catch(err){
            console.log(err)
        }
        finally{
            mongoose.disconnect()
        }
    }
    
    async deleteProdById(id, product) {
        try{
            await this.mongoConnect()
            const delProd = await models.carritos.findByIdAndUpdate(id, {$pull: {productos: product}})
            console.log(`Se eliminó un producto del carrito con id ${id}`)
            return delProd
        }
        catch(err){
            console.log(err)
        }
        finally{
            mongoose.disconnect()
        }
    }
}

export default Carrito