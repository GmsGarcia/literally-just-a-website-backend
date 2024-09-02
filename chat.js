import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import cors from 'cors';

export const chatRouter = express();

// using cors to allow frontend to communicate with backend
chatRouter.use(cors({
    origin: 'http://localhost:3000', 
    methods: ["GET", "POST"],
    credentials: true
}));

// creating socket io server :)
const server = createServer(chatRouter);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', 
        methods: ["GET", "POST"],
        credentials: true
    }
});

// piece of code that handles user connection to the server
io.on('connection', (socket) => {
    const username = socket.handshake.query.username

    console.log('User connected, id: ' + socket.id);

    // console logging, and emiting messages to connected users
    socket.on('chat message', (message) => {
        console.log('Received message:', message, 'Socket id:', socket.id);
        io.emit('chat message', `${username} said ${message}`);
    });

    // console logging when a user disonnects
    socket.on("disconnect", () => {
        console.log('User disconnected, id: ' + socket.id);
    });
});

// making the server listen in port 8501
server.listen(8501, () => {
    console.log('Chat listening on http://localhost:8501');
});
