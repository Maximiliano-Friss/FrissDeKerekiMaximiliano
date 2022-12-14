const knex = require('knex')

class ClienteSqlite3 {
    constructor(options) {
        this.knex = knex(options)
    }

    getAll () {
        return this.knex('mensajes').select('*')
    }

    save(msj) {
        return this.knex('mensajes').insert(msj)
            .then(() => console.log('Se agregó un nuevo mensaje'))
            .catch(err => {console.log(err)})
    }

    close() {
        return this.knex.destroy()
    }
}

module.exports = ClienteSqlite3