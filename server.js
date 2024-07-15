const express = require('express');
const { Client } = require('pg');
const app = express();
const port = 3000;

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'passw0rd',
  port: '5432',
});

client.connect();

app.get('/data', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM cars');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${3000}/`);
});


