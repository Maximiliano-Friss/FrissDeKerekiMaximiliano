import { db } from '../../firebase/db/firebaseConfig.js'
import {doc, arrayUnion, getDoc, addDoc, collection, updateDoc, deleteDoc, serverTimestamp} from 'firebase/firestore';

class Carrito {
    constructor(name){
        this.name = name;
    }

    async saveCart() {
        try{
            const cartCollection = collection(db,'carritos')
            const newCart = await addDoc(cartCollection, {
                productos: [],
                date: serverTimestamp()
            })
            const newCartId = newCart.id
            return newCartId
        }
        catch(err){
            console.log(err)
        }
    }
    
    async deleteCartById(id) {
        try{
            const cartToDelete = await this.getCartById(id)
            await deleteDoc(doc(db, "carritos", id));
            console.log(`Se elimina el carrito con id ${id}`)
            return cartToDelete
        }
        catch(err){
            console.log(err)
        }
    }

    async getCartById(id) {
        try{
            const docRef = doc(db,'carritos', id)
            const selectedCart = await getDoc(docRef)
            .then(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            })
            const productsInCart = selectedCart.productos
            return productsInCart
        }
        catch(err){
            console.log(err)
        }
    }
    
    async saveProductToCart(id, product) {
        try{
            const docRef = doc(db, "carritos", id);
            const productsInCart = await this.getCartById(id)
            console.log(productsInCart)
            productsInCart.push(product)
            console.log(productsInCart)
            const newProd = await updateDoc(docRef, {
                productos: productsInCart
            });
            console.log(`Se agrega el producto ${product.nombre} al carrito con id: ${id}`)
            return newProd
        }
        catch(err){
            console.log(err)
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