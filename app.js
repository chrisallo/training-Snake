
const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');

app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('play');
});
app.listen(3300);

module.exports = app;