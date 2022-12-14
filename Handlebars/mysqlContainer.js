const knex = require('knex')

class ClienteMysql {
    constructor(options) {
        this.knex = knex(options)
    }

    getAll () {
        return this.knex('productos').select('*')
    }

    save(product) {
        return this.knex('productos').insert(product)
            .then(() => console.log('Se agregó un nuevo producto'))
            .catch(err => {console.log(err)})
    }

    close() {
        return this.knex.destroy()
    }
}

module.exports = ClienteMysql