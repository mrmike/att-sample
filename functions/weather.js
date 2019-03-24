/* eslint-disable promise/always-return */
const axios = require('axios');

const API_KEY = 'INSERT_API_KEY_HERE';
const COORDINATES = {
  'poznan': {'lat': '52.4095', 'long': '16.9319'},
  'warszawa': {'lat': '52.2370', 'long': '21.0175'},
  'krakow': {'lat': '50.0496', 'long': '19.9445'}
};

const weatherHandler = (request, response) => {
  const city = request.params['city'];
  if (city in COORDINATES) {
    weatherPromise(city).then((res) => {
      response.set('Cache-Control', 'public, max-age=1800');
      response.json({
        'city': city,
        'time': res.data['currently']['time'],
        'timezone': res.data['timezone'],
        'summary': res.data['currently']['summary'],
        'temperature': res.data['currently']['temperature'],
        'windSpeed': res.data['currently']['windSpeed']
      })
    }).catch((error) => {
      console.error(error);
      response.status(500).json({
        'error': 'server error'
      })
    })
  } else {
    response.status(404).json({
      'error': 'not found'
    })
  }
};

function weatherPromise(city) {
  const lat = COORDINATES[city].lat;
  const long = COORDINATES[city].long;
  return axios.get(`https://api.darksky.net/forecast/${API_KEY}/${lat},${long}?lang=pl&units=si`)
}

module.exports = weatherHandler;