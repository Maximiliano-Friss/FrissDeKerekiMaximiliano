const socket = io();
// const form2 = document.getElementById('form2')

// form2.addEventListener('submit', () => {
//     const newMessage = {
//         email: document.getElementById('email').value,
//         mensaje: document.getElementById('mensaje').value,
//         date: (new Date()).toLocaleString('en-GB'),
//     }
//     socket.emit('newMessage', newMessage)
// })

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

// function renderMessages (data) {
//     const htmlMsg = data.map(element => {
//         return(`
//         <p><span class='email'>${element.email}</span> <span class='date'>${element.date}:</span> <span class='mensaje'>${element.mensaje}</span></p>
//         `)
//     }).join('');
//     document.getElementById('msg').innerHTML = htmlMsg
// }
// socket.on('totalMessages', function(data) {renderMessages(data);})