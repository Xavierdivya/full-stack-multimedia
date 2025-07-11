const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Apply CORS middleware
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: '*' }
});

let counter = 0;

io.on('connection', (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    // Send initial counter value
    socket.emit('updateCounter', counter);

    // Increment
    socket.on('increment', () => {
        counter++;
        io.emit('updateCounter', counter);
    });

    // Decrement
    socket.on('decrement', () => {
        counter--;
        io.emit('updateCounter', counter);
    });

    socket.on('disconnect', () => {
        console.log(`❌ User disconnected: ${socket.id}`);
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
