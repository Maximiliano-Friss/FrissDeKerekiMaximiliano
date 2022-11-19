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
            return product
        }
        catch (err) {
            console.log(err)
        }
    }

    update = async(id, newProduct) => {
        try{
            const currentData = await fs.promises.readFile('./productos.txt', 'utf-8');
            const currentDataJSON = JSON.parse(currentData);
            currentDataJSON[id-1] = {...currentDataJSON[id-1], ...newProduct};
            await fs.promises.writeFile('./productos.txt', JSON.stringify(currentDataJSON, null, 2));
            return currentDataJSON[id-1];
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
            return currentDataJSON.find(element => element.id === number) ?? {error: 'producto no encontrado'};
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

const televisor = {
    title:'televisor',
    price: 599,
    thumbnail: 'https://images.samsung.com/is/image/samsung/p6pim/uy/un32t4310agxug/gallery/uy-hd-t4300-394450-un32t4310agxug-469950136?$650_519_PNG$',
}

const silla = {
    title:'silla',
    price: 49,
    thumbnail: 'https://f.fcdn.app/imgs/1a0055/www.divino.com.uy/div/765e/original/catalogo/240739001_0/1500-1500/silla-de-comedor-madera-acacia-ahf.jpg'
}

const cama = {
    title:'cama',
    price: 600,
    thumbnail: 'https://images.demandware.net/dw/image/v2/BBBV_PRD/on/demandware.static/-/Sites-master-catalog/default/dwc7c0575c/images/460000/461151.jpg?sfrm=jpg'
}


module.exports = Contenedor