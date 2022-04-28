const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/bmicalculator', function (req, res) {
  res.sendFile(__dirname + '/bmiCalculator.html');
});

app.listen(2000, function () {
  console.log('listening on port 3000');
});
app.post('/', function (req, res) {
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  var result = num1 + num2;
  res.send('The result was: ' + result);
});
app.post('/bmicalculator', function (req, res) {
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);
  var resultBMI = weight / (height * height);
  res.send('The result was: ' + resultBMI);
});
