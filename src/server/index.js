import path from 'path';
import express from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config';
import WebSocket from 'ws';
import http from 'http';

const compiler = webpack(webpackConfig);

const app = express(),
  DIST_DIR = path.resolve(__dirname, '..', 'static'),
  HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(
  devMiddleware(compiler, {
    publicPath: 'http://0.0.0.0:8080/'
    // webpack-dev-middleware options
  })
);

app.use(hotMiddleware(compiler));

app.use(express.static(DIST_DIR));

app.get('*', (req, res) => {
  res.sendFile(HTML_FILE)
});

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({server});

webSocketServer.on('connection', (webSocketClient) => {
  webSocketClient.on('message', (message) => {
    webSocketServer.clients.forEach(client => {
      if (client !== webSocketClient) {
        client.send("refetch");
      }
    });
  });
});

server.listen({host: HOST, port: PORT || 8999}, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
