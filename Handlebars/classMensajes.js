const fs = require('fs')

class Mensajes {
    constructor(name){
        this.name = name
    }

    async save(mensaje) {
        try {
            let dataToSave = [];
            
            if (fs.existsSync('./mensajes.txt')) {
                const currentData = await fs.promises.readFile('./mensajes.txt', 'utf-8');
                if (currentData !== '') {
                    dataToSave = JSON.parse(currentData);
                }
            }

            mensaje.id = dataToSave.length + 1
            dataToSave.push(mensaje);
            await fs.promises.writeFile('./mensajes.txt', JSON.stringify(dataToSave, null, 2));
            console.log(`Se escribió un nuevo mensaje. Su id será ${mensaje.id}`)
            return mensaje
        }
        catch (err) {
            console.log(err)
        }
    }

    getAll = async () => {
        try {
            const currentData = await fs.promises.readFile('./mensajes.txt', 'utf-8');
            console.log('Se muestran todos los mensajes');
            return currentData === ''? [] : JSON.parse(currentData);
        }
        catch (err) {
            console.log(err)
        }
    }
}

module.exports = Mensajes