const socket = io();

const schemaAuthor = new normalizr.schema.Entity('author', {}, {idAttribute:'email'})

const schemaSingleMessage = new normalizr.schema.Entity('singleMessage',{
    author: schemaAuthor
})

const schemaMessages = new normalizr.schema.Entity('mensajes', {
    mensajes: [schemaSingleMessage]
})

function renderProducts (data) {
    let table = `
    <table class="table table-success" id="table1">
        <thead>
            <tr class="h3">
                <th>Nombre</th>
                <th>Precio</th>
                <th>Thumbnail</th>
            </tr>
        </thead>`
        let htmlProd = data.map(element => {
            return(`
            <tbody>
                <tr>
                    <td>${element.nombre}</td>
                    <td>${element.precio}</td>
                    <td><img src=${element.thumbnail}></td>
                </tr>
            </tbody>
    </table>`)
    }).join('');
    const table1 = document.getElementById('table1')
    if (table1 !== null) {
        table1.innerHTML = table +=htmlProd;
    }
}
socket.on('totalProducts', function(data) {renderProducts(data);})

const form2 = document.getElementById('form2')

form2.addEventListener('submit', () => {
    const newMessage = {
        createdAt: (new Date()).toLocaleString('en-GB'),
        mensaje: document.getElementById('mensaje').value,
        author: {
            email: document.getElementById('email').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            edad: document.getElementById('edad').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value,
        }
    }
    socket.emit('newMessage', newMessage)
})

function renderMessages (data) {
    const denormObj = normalizr.denormalize(data.result, schemaMessages, data.entities)
    const htmlMsg = denormObj.mensajes.map(element => {
        return(`
        <div class='mensaje-box'>
        <img src=${element.author.avatar} width=50>
        <p><span class='email'>${element.author.email}</span> <span class='date'>${element.createdAt}:</span> <span class='mensaje'>${element.mensaje}</span></p>
        </div>
        `)
    }).join('');
    document.getElementById('msg').innerHTML = htmlMsg
    document.getElementById('compresion').innerHTML = (100 - 100*(JSON.stringify(data).length)/(JSON.stringify(denormObj).length)).toFixed(0) + '%'
}
socket.on('totalMessages', function(data) {renderMessages(data);})