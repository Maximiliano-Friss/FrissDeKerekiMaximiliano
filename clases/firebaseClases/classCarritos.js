import { db } from '../../firebase/db/firebaseConfig.js'
import {doc, getDocs, getDoc, addDoc, collection, updateDoc, deleteDoc, serverTimestamp} from 'firebase/firestore';

class Carrito {
    constructor(name){
        this.name = name;
    }

    async saveCart() {
        try{
            const cartCollection = collection(db,'carritos')
            const addedCart = await addDoc(cartCollection, {
                productos: [],
                date: serverTimestamp()
            })
            const newCart = await this.getById(addedCart.id)
            return newCart
        }
        catch(err){
            console.log(err)
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