const socket = io('http://localhost:5001');

socket.on('updateCounter', (value) => {
    document.getElementById('counter').innerText = value;
});

function increment() {
    socket.emit('increment');
}

function decrement() {
    socket.emit('decrement');
}
