const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const date = require(__dirname + '/date.js');

const app = express();
mongoose.connect('mongodb://localhost:4000');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function (req, res) {
  let day = date.getDate();
  res.render('list', { listTitle: day, newListItem: items });
});
app.post('/', function (request, response) {
  var item = request.body.newItem;
  if (request.body.list === 'work') {
    workItems.push(item);
    response.redirect('/work');
  } else {
    items.push(item);
    response.redirect('/');
  }
});

app.get('/work', function (req, res) {
  res.render('list', { listTitle: 'Work List', newListItem: workItems });
});
app.post('/work', function (req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect('/work');
});

app.listen(4000, function () {
  console.log('Server started');
});
