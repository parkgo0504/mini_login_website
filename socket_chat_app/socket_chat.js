const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname)); // Serve static files

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/socket_chat_html.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

// server.listen(3000, () => {
//   console.log(`서버가 http://localhost:${3000} 에서 작동 중입니다.`);
// });


server.listen(3000, '59.3.58.102', () => {
  console.log(`서버가 http://59.3.58.102:${3000} 에서 작동 중입니다.`);
});
