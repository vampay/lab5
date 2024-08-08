const mongoose = require('mongoose');

const uri = 'your-mongodb-connection-string';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected successfully');
  })
  .catch(err => {
    console.error('Connection error', err);
  });