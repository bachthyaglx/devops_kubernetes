const express = require('express');
const { Pool } = require('pg');
const morgan = require('morgan');
const app = express();
const PORT = 3000;

// Request logging middleware
app.use(morgan('[:date[iso]] :method :url :status - :response-time ms'));

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
    console.error('❌ DB error on GET /todos:', err);
    res.status(500).json({ error: 'DB error' });
  }
});

app.post('/todos', async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      console.error('❌ Rejected empty todo.');
      return res.status(400).json({ error: 'Todo is required' });
    }

    if (content.length > 140) {
      console.error(`❌ Rejected too long todo (${content.length} chars): ${content}`);
      return res.status(400).json({ error: 'Todo must be under 140 characters' });
    }

    await pool.query('INSERT INTO todos (content) VALUES ($1)', [content]);
    console.log(`✅ New todo saved: "${content}"`);
    res.status(201).json({ message: 'Created' });
  } catch (err) {
    console.error('❌ DB error on POST /todos:', err);
    res.status(500).json({ error: 'DB error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ todo-backend running on port ${PORT}`);
});
