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
            console.log('Se agregó un nuevo producto. Su id será')
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
            console.log(`Se muestra el producto con el id ${number}:`)
            return currentDataJSON.find(element => element.id === number) ?? null;
        }
        catch (err) {
            console.log(err)
        }
    }

    getAll = async () => {
        try {
            const currentData = await fs.promises.readFile('./productos.txt', 'utf-8');
            console.log('Se muestran todos los productos');
            return JSON.parse(currentData);
        }
        catch (err) {
            console.log(err)
        }
    }

    deleteById = async (number) => {
        try {
            const currentData = await fs.promises.readFile('./productos.txt', 'utf-8');
            const currentDataJSON = JSON.parse(currentData);
            const newCurrentDataJSON = currentDataJSON.filter(element => element.id !== number);
            const newCurrentDataJSONUpdatedId = newCurrentDataJSON.map((element, index) => ({...element, id: index + 1}))
            await fs.promises.writeFile('./productos.txt', JSON.stringify(newCurrentDataJSONUpdatedId, null, 2));
            console.log(`Se eliminó el producto de id ${number}.`)
        }
        catch (err) {
            console.log(err)
        }
    }

    deleteAll = async () => {
        try {
            fs.promises.writeFile('./productos.txt', '');
            console.log('Todos los productos han sido eliminados.')
        }
        catch (err) {
            console.log(err)
        }
    }
}

module.exports = Contenedor