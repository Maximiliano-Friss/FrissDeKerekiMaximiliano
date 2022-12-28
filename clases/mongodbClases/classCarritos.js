import mongoose from 'mongoose';
import * as models from '../../mongo/models/carritos.js'
import URL from '../../mongo/mongoConfig.js'

class Carrito {
    constructor(name){
        this.name = name;
    }

    async mongoConnect() {
        await mongoose.set("strictQuery", false);

        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },console.log('Conectado a MongoDB Atlas'))
    }

    async saveCart() {
        try{
            await this.mongoConnect()
            const newCart = await models.carritos.save()
            console.log(`Se creó un nuevo carrito con id: ${newCart.id}`)
        }
        catch(err){
            console.log(err)
        }
        finally{
            mongoose.disconnect()
        }
    }
    
    deleteCartById = async (number) => {
        try {
            const currentData = await fs.promises.readFile('./contenedorArchivos/carritos.txt', 'utf-8');
            const currentDataJSON = JSON.parse(currentData);
            const newCurrentDataJSON = currentDataJSON.filter(element => element.id !== number);
            const newCurrentDataJSONUpdatedId = newCurrentDataJSON.map((element, index) => ({...element, id: index + 1}))
            await fs.promises.writeFile('./contenedorArchivos/carritos.txt', JSON.stringify(newCurrentDataJSONUpdatedId, null, 2));
            console.log(`Se eliminó el carrito de id ${number}.`);
        }
        catch (err) {
            console.log(err)
        }
    }

    getCartById = async (number) => {
        try {
            const currentData = await fs.promises.readFile('./contenedorArchivos/carritos.txt', 'utf-8');
            const currentDataJSON = JSON.parse(currentData);
            console.log(`Se busca el carrito con el id ${number}:`);
            return currentDataJSON.find(element => element.id === number) ?? undefined;
        }
        catch (err) {
            console.log(err)
        }
    }
    
    saveProductToCart = async(cartId, product) => {
        try {
            const currentCarts = await fs.promises.readFile('./contenedorArchivos/carritos.txt', 'utf-8');
            const currentCartsJSON = JSON.parse(currentCarts);
            const selectedCart = currentCartsJSON.find(element => element.id === cartId) ?? undefined;
            let dataToSave = selectedCart.products;
            product.id = dataToSave.length + 1;
            dataToSave.push(product);
            selectedCart.products = dataToSave;
            currentCartsJSON[cartId-1] = {...currentCartsJSON[cartId-1], ...selectedCart};
            await fs.promises.writeFile('./contenedorArchivos/carritos.txt', JSON.stringify(currentCartsJSON, null, 2));
            console.log(`Se agregó un nuevo producto al carrito de ID ${cartId}`);
        }
        catch (err) {
            console.log(err)
        }
    }
    
    deleteProdById = async (cartId, prodId) => {
        try {
            const currentCarts = await fs.promises.readFile('./contenedorArchivos/carritos.txt', 'utf-8');
            const currentCartsJSON = JSON.parse(currentCarts);
            const deletedProduct = currentCartsJSON[cartId-1].products[prodId-1];
            const filteredProducts = currentCartsJSON[cartId-1].products.filter(element => element.id !== prodId);
            const filteredProductsUpdatedId = filteredProducts.map((element, index) => ({...element, id: index + 1}));
            currentCartsJSON[cartId-1].products = filteredProductsUpdatedId;
            await fs.promises.writeFile('./contenedorArchivos/carritos.txt', JSON.stringify(currentCartsJSON, null, 2));
            return deletedProduct;
        }
        catch (err) {
            console.log(err);
        }
    }
}

export default Carrito