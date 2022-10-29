const fs = require('fs')

class Contenedor {
    constructor(name){
        this.name = name
    }

    async save(product) {
        try {
            let dataToSave = [];
            
            if (fs.existsSync('./productos.txt')) {
                const currentData = await fs.promises.readFile('./productos.txt', 'utf-8');
                if (currentData !== '') {
                    dataToSave = JSON.parse(currentData);
                }
            }

            product.id = dataToSave.length + 1
            dataToSave.push(product);
            await fs.promises.writeFile('./productos.txt', JSON.stringify(dataToSave, null, 2));
            return product.id
        }
        catch (err) {
            console.log(err)
        }
    }

    getById = async (number) => {
        try {
            const currentData = await fs.promises.readFile('./productos.txt', 'utf-8');
            const currentDataJSON = JSON.parse(currentData);
            return currentDataJSON.find(element => element.id === number) ?? null;
        }
        catch (err) {
            console.log(err)
        }
    }

    getAll = async () => {
        try {
            const currentData = await fs.promises.readFile('./productos.txt', 'utf-8');
            return JSON.parse(currentData);
        }
        catch (err) {
            console.log(err)
        }
    }

    deleteById = async (number) => {
        try {
            const currentData = await fs.promises.readFile('./productos.txt', 'utf-8');
            console.log(currentData)
            const currentDataJSON = JSON.parse(currentData);
            console.log('currentDataJSON es '+currentDataJSON)
            const newCurrentDataJSON = currentDataJSON.filter(element => element.id !== number);
            console.log('newCurrentDataJSON es ' + newCurrentDataJSON)
            const newCurrentDataJSONUpdatedId = newCurrentDataJSON.map(element => element.id = newCurrentDataJSON.indexOf(element) + 1)
            console.log(newCurrentDataJSONUpdatedId)
            await fs.promises.writeFile('./productos.txt', JSON.stringify(newCurrentDataJSON, null, 2));
        }
        catch (err) {
            console.log(err)
        }
    }

    deleteAll = async () => {
        try {
            fs.promises.writeFile('./productos.txt', '');
        }
        catch (err) {
            console.log(err)
        }
    }
}

module.exports = Contenedor