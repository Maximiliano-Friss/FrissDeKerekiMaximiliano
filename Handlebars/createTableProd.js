import { faker } from '@faker-js/faker'
faker.locale = 'es'

function getProducts(id) {
    return {
        id: id,
        nombre: faker.commerce.product(),
        precio: faker.commerce.price(50, 1000, 0),
        thumbnail: faker.image.image()
    }
}

export default getProducts