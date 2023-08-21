/*
*최초작성자 :박기원
*최초작성일 :2023.08.18
*최종변경일 :2023.08.22
*목적 : 채팅 서버 따로 팜 테스트 js  
*개정이력 : 채팅 ip 이름 불러와서 메시지 옆에 ip출력하기 및 방 개념 추가
*/

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const roomChatHistory = {}; // 방 이름과 채팅 기록을 매칭하는 객체


app.use(express.static(__dirname)); // Serve static files

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/socket_chat_html.html');
});

io.on('connection', (socket) => {
  const userIpAddress = socket.handshake.address; // id 가져오기
  console.log(userIpAddress+' user connected');

  socket.on('join room', (roomName) => {
    socket.join(roomName);


    if (!roomChatHistory[roomName]) {
      roomChatHistory[roomName] = []; // 방 이름에 해당하는 채팅 기록 객체 초기화
    }
    socket.emit('chat history', roomChatHistory[roomName]); // 이전 채팅 기록 전송

  });


  socket.on('disconnect', () => {
    console.log('User disconnected');

  });
  socket.on('leave room', (roomName) => {
    socket.leave(roomName);
  });

  socket.on('chat message', (data) => {
    if (roomChatHistory[data.room]) { // 방 이름에 해당하는 채팅 기록 객체가 있는지 확인
    const messageWithIp = `${data.name}: ${data.message}`;
    roomChatHistory[data.room].push(messageWithIp); // 해당 방의 채팅 기록에 추가
    io.to(data.room).emit('chat message', messageWithIp);
  }
  });
});
  // socket.on('chat message', (data) => {
  //   const messageWithIp = `${data.name}: ${data.message}`;
  //   io.emit('chat message', messageWithIp);
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
