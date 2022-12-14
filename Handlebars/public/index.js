const socket = io();
const form1 = document.getElementById('form1')
const form2 = document.getElementById('form2')

form1.addEventListener('submit', () => {
    const newProduct = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        thumbnail: document.getElementById('thumbnail').value,
    }
    socket.emit('newProduct', newProduct)
})

form2.addEventListener('submit', () => {
    const newMessage = {
        email: document.getElementById('email').value,
        mensaje: document.getElementById('mensaje').value,
        date: (new Date()).toLocaleString('en-GB'),
    }
    socket.emit('newMessage', newMessage)
})

function renderProducts (data) {
    const htmlProd = data.map(element => {
        return(`
        <tr>
            <td>${element.nombre}</td>
            <td>${element.precio}</td>
            <td><img src="${element.thumbnail}" alt="Icono $${element.nombre}"></td>
        </tr>
        `)
    }).join('');
    const table1 = document.getElementById('table1')
    if (table1 !== null) {
        table1.innerHTML = htmlProd;
    }
}
socket.on('totalProducts', function(data) {renderProducts(data);})

function renderMessages (data) {
    const htmlMsg = data.map(element => {
        return(`
        <p><span class='email'>${element.email}</span> <span class='date'>${element.date}:</span> <span class='mensaje'>${element.mensaje}</span></p>
        `)
    }).join('');
    document.getElementById('msg').innerHTML = htmlMsg
}
socket.on('totalMessages', function(data) {renderMessages(data);})