const knex = require('knex')(options)

class ClienteMysql {
    constructor(options, db) {
        this.knex = knex(options)
    }

    async save(product) {
        try {
            knex.schema.hasTable('productos')
                .then((exists) => {
                    if (!exists) {
                        return knex.schema.createTable('mensajes', table => {
                        table.increments('id').primary()
                        table.string('email').notNullable()
                        table.string('mensaje').notNullable()
                        table.date('date').notNullable()
                    })}
                });
            return this.knex('productos').insert(product)
        }
        catch (err) {
            console.log(err)
        }
        finally {
            this.knex.destroy()
        }
    }

    getAll = async () => {
        try {
            return this.knex('productos').select('*');
        }
        catch (err) {
            console.log(err)
        }
        finally {
            this.knex.destroy()
        }
    }
}

module.exports = ClienteMysql