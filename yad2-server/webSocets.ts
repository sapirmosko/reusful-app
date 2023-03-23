import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

let userCount = 0;

io.on('connection', (socket) => {
  userCount++;
  io.emit('userCountUpdated', userCount);

  socket.on('disconnect', () => {
    userCount--;
    io.emit('userCountUpdated', userCount);
  });
});

httpServer.listen(3000, () => {
  console.log('listening on *:3000');
});
