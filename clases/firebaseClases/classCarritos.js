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

    isInCart = (prod_id) => {
        return products.some(product => product.id === prod_id);
    }
    
    async saveProductToCart(id, product) {
        try{
            const docRef = doc(db, "carritos", id);
            const productsInCart = await this.getCartById(id)
            let addedProd = {}
            const duplicatedProd = productsInCart.find(element => element.nombre === product.nombre)
            const index = productsInCart.findIndex(item => item.nombre === product.nombre);
            if (productsInCart.some(element => element.id === product.id)) {
                addedProd = {
                    ...duplicatedProd,
                    cantidad: (duplicatedProd.cantidad + 1)
                }
                productsInCart.splice(index, 1, addedProd)
            } else {
                addedProd = {
                    ...product,
                    cantidad: 1
                }
                productsInCart.push(addedProd)
            }
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
            console.log(product)
            const docRef = doc(db, "carritos", id);
            const productsInCart = await this.getCartById(id)
            const index = productsInCart.map(prod => prod.id).indexOf(product.id)
            productsInCart.splice(index, 1)
            await updateDoc(docRef, {
                productos: productsInCart
            });
            console.log(`Se elimina el producto ${product.nombre} del carrito con id: ${id}`)
        }
        catch(err){
            console.log(err)
        }
    }
}

export default Carrito