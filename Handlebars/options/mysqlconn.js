require('dotenv').config()

const options = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'dbprod'
    }
}

module.exports = {
    options
}