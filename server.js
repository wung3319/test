const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const socketIO = require('socket.io');
const os = require('os');

const app = express();

// SSL 인증서 경로 설정
const options = {
  key: fs.readFileSync(path.resolve(__dirname, 'private.pem')), // private.pem 파일의 절대 경로
  cert: fs.readFileSync(path.resolve(__dirname, 'public.pem')) // public.pem 파일의 절대 경로
};

// Vue.js 애플리케이션의 정적 파일 서빙
const staticFilesPath = path.join(__dirname, 'dist');
app.use(express.static(staticFilesPath));

// 모든 요청에 대해 Vue.js 애플리케이션의 index.html 파일을 제공
app.get('*', (req, res) => {
  res.sendFile(path.join(staticFilesPath, 'index.html'));
});

// HTTPS 서버 생성
const port = process.env.PORT || 443;
const server = https.createServer(options, app);

// 소켓 연결 설정
const io = socketIO(server);
io.on('connection', (socket) => {
  console.log('소켓 클라이언트가 연결됨');

  socket.on('message', (message) => {
    console.log('수신한 메시지: ', message);
    // 메시지 처리 및 다른 피어로 전달
    socket.broadcast.emit('message', message);
  });

  socket.on('create or join', function (room) {
    let clients = io.sockets.adapter.rooms.get(room);
    let numClients = clients ? clients.size : 0;

    console.log(`Received request to create or join room ${room}. Number of clients in room: ${numClients}`);

    if (numClients === 0) {
      socket.join(room);
      console.log(`Client ID ${socket.id} created room ${room}`);
      socket.emit('created', room, socket.id);
    } else if (numClients === 1) {
      // 두 번째 클라이언트가 방에 참여
      console.log(`Client ID ${socket.id} joined room ${room}`);
      io.to(room).emit('join', room);
      socket.join(room);
      socket.emit('join', room, socket.id); // 이 클라이언트에게만 보냄
      io.sockets.in(room).emit('ready'); // 모든 클라이언트에게 보냄
    } else {
      socket.emit('full', room);
    }
  });

  socket.on('bye', () => {
    console.log('received bye');
  });
  socket.on('ipaddr', function () {
    const ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach(function (dev) {
      ifaces[dev].forEach(function (details) {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          socket.emit('ipaddr', details.address);
        }
      });
    });
  });
});



// HTTPS 서버 리스닝
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
