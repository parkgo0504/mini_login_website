/*
*최초작성자 :박기원
*최초작성일 :2023.08.18
*최종변경일 :2023.08.21
*목적 : 채팅 서버 따로 팜 테스트 js  
*개정이력 : 채팅 ip 이름 불러와서 메시지 옆에 ip출력하기
*/

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
  const userIpAddress = socket.handshake.address; // Get user's IP address
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

    socket.on('join room', (roomName) => {
    socket.join(roomName);
  });

  socket.on('leave room', (roomName) => {
    socket.leave(roomName);
  });


  
  socket.on('chat message', (data) => {
    const messageWithIp = `${data.name}: ${data.message}`;
    io.emit('chat message', messageWithIp);
  });
  

  // socket.on('chat message', (msg) => {
  //   io.emit('chat message', msg);
  // });
});


// io.on('connection', (socket) => {
//   console.log('A user connected');

//   const userIpAddress = socket.handshake.address; // Get user's IP address

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });

//   socket.on('join room', (roomName) => {
//     socket.join(roomName);
//   });

//   socket.on('leave room', (roomName) => {
//     socket.leave(roomName);
//   });

//   socket.on('chat message', (msg, roomName) => {
//     const messageWithIp = `${userIpAddress}: ${msg}`;
//     io.to(roomName).emit('chat message', messageWithIp);
//   });
// });


// server.listen(3000, () => {
//   console.log(`서버가 http://localhost:${3000} 에서 작동 중입니다.`);
// });


// server.listen(3000, '59.3.58.102', () => {
//   console.log(`서버가 http://59.3.58.102:${3000} 에서 작동 중입니다.`);
// });

server.listen(3000, '192.168.0.15', () => {
  console.log(`서버가 http://192.168.0.15:${3000} 에서 작동 중입니다.`);
});
