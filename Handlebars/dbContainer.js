const knex = require('knex')

class Cliente {
    constructor(options, db) {
        this.knex = knex(options);
        this.db = db;
    }

    getAll () {
        return this.knex(this.db).select('*')
    }

    save(data) {
        return this.knex(this.db).insert(data)
            .then(() => console.log('Agregado con éxito'))
            .catch(err => {console.log(err)})
    }

    close() {
        return this.knex.destroy()
    }
}

module.exports = Cliente