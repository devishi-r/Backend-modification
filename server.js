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

app.use(express.json());

app.get('/data', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM cars');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/update', express.json(), async (req, res) => {
    const { id, brand, model, year } = req.body;
    console.log('Received data for update:', req.body);
    try {
      const result = await client.query(
        'UPDATE cars SET brand = $1, model = $2, year = $3 WHERE id = $4 RETURNING *',
        [brand, model, year, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'No matching record found' });
      }
      console.log('Update result:', result.rows[0]);
      res.json(result.rows[0]);
    } catch (err) {
        console.error('Database update error:', err);
      res.status(500).send('Internal Server Error');
    }
  });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${3000}/`);
  });
  