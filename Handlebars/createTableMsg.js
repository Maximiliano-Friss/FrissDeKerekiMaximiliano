const { options2 } = require('./options/sqlite3conn.js')
const knex = require('knex')(options2)

knex.schema.createTable('mensajes', table => {
    table.increments('id').primary()
    table.string('email').notNullable()
    table.string('mensaje').notNullable()
    table.date('date').notNullable()
})
.then(() => console.log('Tabla mensajes creada'))
.catch(err => console.log(err))
.finally(() => {
    knex.destroy()
})