import { db } from './firebase/db/firebaseConfig.js'
import {doc, getDoc, updateDoc, getDocs, collection, arrayUnion} from 'firebase/firestore';

class Mensajes {
    constructor(name){
        this.name = name;
    }

    async save(msg) {
        try{
            const msgCollection = doc(db, "mensajes", "grupoMsg");
            const allMsg = await this.getAll()
            msg.id = allMsg.mensajes.length + 1
            await updateDoc(msgCollection, {
                mensajes: arrayUnion(msg)
            });
        }
        catch(err){
            console.log(err)
        }
    }

    async getAll() {
        try{
            const docRef = doc(db,'mensajes', 'grupoMsg')
            const selectedMsgs = await getDoc(docRef)
            .then(doc => {
                return {
                    ...doc.data(),
                }
            })
            return selectedMsgs
        }
        catch(err){
            console.log(err)
        }
    }

}

export default Mensajes