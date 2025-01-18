const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
let users = []; // Array to track connected users
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    // Handle user joining
    socket.on('join', (userName) => {
        users.push({ id: socket.id, name: userName });
        console.log(`${userName} has joined the chat`);
        io.emit('userJoined', `${userName} has joined the chat`);
    });
    // Handle receiving messages from a user
    socket.on('sendMessage', (messageData) => {
        console.log('Message received:', messageData);
        io.emit('receiveMessage', messageData); // Broadcast to all clients
    });
    // Handle user disconnecting
    socket.on('disconnect', () => {
        const user = users.find((u) => u.id === socket.id);
        if (user) {
            console.log(`${user.name} has left the chat`);
            io.emit('userLeft', `${user.name} has left the chat`);
            users = users.filter((u) => u.id !== socket.id);
        }
    });
});
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});