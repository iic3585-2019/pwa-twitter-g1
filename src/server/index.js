import path from 'path';
import express from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config';

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

app.get('/styles/index.scss', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'app','styles' ,'index.scss'));
});

app.get('/index.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'app', 'service-worker.js'));
});


app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'app', 'service-worker.js'));
});


app.get('*', (req, res) => {
  res.sendFile(HTML_FILE)
});

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`App listening to ${PORT}....`);
  console.log('Press Ctrl+C to quit.');
});
