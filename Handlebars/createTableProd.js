const { options } = require('./options/mysqlconn.js')
const knex = require('knex')(options)

knex.schema.createTable('productos', table => {
    table.increments('id').primary()
    table.string('nombre', 20).notNullable()
    table.float('precio')
    table.string('thumbnail', 1000).notNullable()
})
.then(() => console.log('Tabla productos creada'))
.catch(err => console.log(err))
.finally(() => {
    knex.destroy()
})