require('@babel/polyfill');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const expressWs = require('express-ws');

const webpackConfig = require('./webpack.config');

const app = express();
expressWs(app);

app.use(
  webpackDevMiddleware(webpack(webpackConfig), {
    publicPath: '/',
  }),
);

app.ws('/ws', ws => {
  ws.on('message', msg => {
    const message = JSON.parse(msg);

    switch (message.type) {
      case 'SEND_MESSAGE':
        ws.send(
          JSON.stringify({
            type: 'RECEIVE_MESSAGE',
            title: message.title,
            content: message.content,
          }),
        );
    }
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
