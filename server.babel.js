import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import hbs from 'express-handlebars';
import App from './src/components/App';

const app = new Express();
const server = new Server(app);

const API_URL = "http://localhost:3000/api";

app.engine('html', hbs({extname:'html'}));
app.set('view engine', 'html');

app.use(Express.static(__dirname + '/src/static'));
app.set('views', __dirname + '/src/static/');

app.get('/', function home (req, res, next) {
  res.render('layout', {
    reactHtml: renderToString(<App />)
  });
});

const port = process.env.PORT || 5000;
server.listen(port, error => {
  if (error) return console.error(err);
  console.info(`Server running on http://localhost:${port}`);
});
