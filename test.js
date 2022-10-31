const Contenedor = require('./classContenedor.js')

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

const cont = new Contenedor('Productos')

const main = async () => {
    console.log(await cont.save(televisor));
    console.log(await cont.save(silla));
    console.log(await cont.save(cama));
    console.log(await cont.getById(2));
    console.log(await cont.getAll());
    // await cont.deleteById(1);
    // await cont.deleteAll();
}

main()