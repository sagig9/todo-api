const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const port = process.env.PORT;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins; adjust in production!
  }
});

// Attach io instance to app so it can be used elsewhere
app.set('io', io);

// Socket.IO Events
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('lockTask', (taskId) => {
    socket.broadcast.emit('taskLocked', { taskId, lockedBy: socket.id });
  });

  socket.on('unlockTask', (taskId) => {
    socket.broadcast.emit('taskUnlocked', { taskId });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
