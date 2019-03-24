/* eslint-disable promise/always-return */
const admin = require('firebase-admin');

// Insert Firebase config
admin.initializeApp({
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  databaseURL: "DATABASE_URL",
  projectId: "PROJECT_ID",
  storageBucket: "STORING_BUCKET",
  messagingSenderId: "SENDER_ID"
});

const firestore = admin.firestore();

const coordinatesHandler = (request, response) => {
  firestore
    .collection('coordinates')
    .get()
    .then((snapshot) => {
        let coords = [];
        snapshot.forEach((item) => {
          coords.push({
            'city': item.data()['city'],
            'lat': item.data()['lat'],
            'long': item.data()['long']
          })
        });

        response.set('Cache-Control', 'public, max-age=1800');
        response.json(coords)
      }
    ).catch(() => {
    response.status(500).json({
      "error": "not found"
    })
  })
};

module.exports = coordinatesHandler;