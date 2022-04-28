const express = require('express');
const https = require('https');

const app = express();

app.get('/', function (req, res) {
  const apiKey = 'c70931632282c82ca7ac1b5eff62a6c8';
  const query = 'London';
  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    query +
    '&appid=' +
    apiKey +
    '&units=metric';
  https.get(url, function (response) {
    console.log(response);
    response.on('data', function (data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      res.write('<h1>The temperature is ' + temp + '°C</h1>');
      res.write('The weather is currently' + weatherDescription);
      const imgURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
      res.write('<img src =' + imgURL + '>');
      res.send();
    });
  });
});

app.listen(1000, function () {
  console.log('server listening on port 1000');
});
