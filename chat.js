import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import cors from 'cors';

export const chatRouter = express();
chatRouter.use(cors({
    origin: 'http://localhost:3000', 
    methods: ["GET", "POST"],
    credentials: true
}));
const server = createServer(chatRouter);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', 
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('User connected, id: ' + socket.id);

    socket.on('chat message', (message) => {
        console.log('Received message:', message);
        io.emit('chat message', `${socket.id.substring(0,2)} said ${message}`);
    });

    socket.on("disconnect", () => {
        console.log('User disconnected, id: ' + socket.id);
    });
});

server.listen(8501, () => {
    console.log('Chat listening on http://localhost:8501');
});
