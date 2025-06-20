const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/pingpong', async (req, res) => {
  try {
    // Ensure the table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pingpong (
        id SERIAL PRIMARY KEY,
        count INTEGER
      )
    `);

    // Fetch current count
    const result = await pool.query('SELECT count FROM pingpong WHERE id = 1');

    let currentCount = 0;
    if (result.rows.length === 0) {
      currentCount = 1;
      await pool.query('INSERT INTO pingpong (id, count) VALUES (1, $1)', [currentCount]);
    } else {
      currentCount = result.rows[0].count + 1;
      await pool.query('UPDATE pingpong SET count = $1 WHERE id = 1', [currentCount]);
    }

    res.send(`Ping / Pongs: ${currentCount}`);
  } catch (err) {
    console.error('❌ Database error:', err);
    res.status(500).send('❌ Database error');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Pingpong app running on port ${PORT}`);
});
