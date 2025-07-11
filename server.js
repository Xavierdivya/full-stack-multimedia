const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: '*' } // Allow all origins for simplicity
});

let counter = 0;

io.on('connection', (socket) => {
    console.log('A user connected');

    // Send initial counter value
    socket.emit('updateCounter', counter);

    // Handle counter update
    socket.on('increment', () => {
        counter++;
        io.emit('updateCounter', counter);
    });

    socket.on('decrement', () => {
        counter--;
        io.emit('updateCounter', counter);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(5001, () => {
    console.log('Server is running on http://localhost:5001');
});
