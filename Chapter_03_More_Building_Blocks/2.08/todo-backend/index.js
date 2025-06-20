const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = 3000;

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/todos', async (req, res) => {
  try {
    await pool.query('CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, content TEXT NOT NULL)');
    const result = await pool.query('SELECT * FROM todos');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ DB error:', err);
    res.status(500).json({ error: 'DB error' });
  }
});

app.post('/todos', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content || content.length > 140) return res.status(400).json({ error: 'Invalid todo' });
    await pool.query('INSERT INTO todos (content) VALUES ($1)', [content]);
    res.status(201).json({ message: 'Created' });
  } catch (err) {
    console.error('❌ DB error:', err);
    res.status(500).json({ error: 'DB error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ todo-backend running on port ${PORT}`);
});
