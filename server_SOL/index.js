const express = require('express');
const db = require('./queries');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

// Ensure db.getUserById is a valid function before using it as a callback
if (typeof db.getUserById === 'function') {
  app.get('/users/:id', db.getUserById);
} else {
  console.error('Error: db.getUserById is not a valid function.');
}

if (typeof db.createUser === 'function') {
    app.post('/users', db.createUser);
  } else {
    console.error('Error: db.getUserById is not a valid function.');
  }

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});