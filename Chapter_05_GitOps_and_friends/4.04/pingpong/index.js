const express = require('express');
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
  host: process.env.PG_HOST,
  user: 'postgres',
  password: process.env.PG_PASSWORD,
  database: 'postgres',
});

app.get('/', (req, res) => res.send('Pingpong is alive'));

app.get('/pingpong', async (req, res) => {
  await pool.query('CREATE TABLE IF NOT EXISTS counts (id SERIAL)');
  const result = await pool.query('SELECT COUNT(*) FROM counts');
  await pool.query('INSERT INTO counts DEFAULT VALUES');
  res.send(`Ping / Pongs: ${result.rows[0].count}`);
});

// Readiness probe endpoint
app.get('/healthz', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.send('DB connection established');
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    res.status(500).send('DB connection failed');
  }
});

app.listen(3000, () => console.log('Running on :3000'));
