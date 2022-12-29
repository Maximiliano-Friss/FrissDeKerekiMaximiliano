import { db } from '../../firebase/db/firebaseConfig.js'
import {doc, getDocs, getDoc, addDoc, collection, updateDoc, query, where, serverTimestamp} from 'firebase/firestore';

// const prodCollection = db.collection('productos')

class Productos {
    constructor(name){
        this.name = name;
    }

    async save(product) {
        try{
            const prodCollection = collection(db,'productos')
            const addedProd = await addDoc(prodCollection, {
                ...product,
                date: serverTimestamp()
            })
            const newProd = await this.getById(addedProd.id)
            return newProd
            
        }
        catch(err){
            console.log(err)
        }
    }

    async update(id, updProduct) {
        try{
            const docRef = doc(db, "productos", id);

            await updateDoc(docRef, {
                ...updProduct
                });
            console.log(`Se actualiza el producto con id: ${id}`)
            const updatedProd = await this.getById(id)
            return updatedProd
        }
        catch(err){
            console.log(err)
        }
    }
    
    async getById(id) {
        try{
            const docRef = doc(db,'productos', id)
            const selectedProd = await getDoc(docRef)
            .then(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            })
            return selectedProd
        }
        catch(err){
            console.log(err)
        }
    }

    async getAll() {
        try{
            const prodCollection = collection(db,'productos')
            const allProd = await getDocs(prodCollection)
            .then(result => {
                const lista = result.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                })
                return lista
            })
            return allProd
        }
        catch(err){
            console.log(err)
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