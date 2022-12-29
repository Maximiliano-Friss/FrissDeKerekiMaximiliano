import { db } from '../../firebase/db/firebaseConfig.js'
import {doc, getDocs, getDoc, addDoc, collection, updateDoc, deleteDoc, query, where, serverTimestamp} from 'firebase/firestore';

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
            const prodToDelete = await this.getById(id)
            await deleteDoc(doc(db, "productos", id));
            console.log(`Se elimina el producto con id ${id}`)
            return prodToDelete
        }
        catch(err){
            console.log(err)
        }
    }

    async deleteAll() {
        try{
            const prodCollection = collection(db,'productos')
            const allProd = await getDocs(prodCollection)
            .then(result => {
                result.docs.forEach(async(element) => {
                    await this.deleteById(element.id)
                });
            })
            console.log('Se eliminan todos los productos')
        }
        catch(err){
            console.log(err)
        }
    }
}

export default Productos