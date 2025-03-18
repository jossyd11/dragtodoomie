const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { WebcastPushConnection } = require('tiktok-live-connector');

const app = express();
const path = require('path');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

require('dotenv').config();

const port = 8000;

app.use(express.static(path.join(__dirname + '/src')));

app.listen(port, () => {
  console.log(`
  server is running on http://localhost:${port}`);
});


wss.on('connection', (ws) => {
  console.log('game listening to websocket.');

    tiktokLiveConnection = new WebcastPushConnection(process.env.TIKTOK_USERNAME);
    tiktokLiveConnection.connect().then(state => {
      console.info(`listening to live data: ${state.roomId}`);
    }).catch(err => {
      console.error('failed to connect', err);
    });

    tiktokLiveConnection.on('chat', data => {
      data.type = 'chat';
      ws.send(JSON.stringify(data));
    });

    tiktokLiveConnection.on('like', data => {
      data.type = 'like';
      ws.send(JSON.stringify(data));
    });

});

server.listen(3000, () => {
  console.log('websocket server started on port 3000.');
});