const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const content = req.body.content;
  if (content && content.length <= 140) {
    todos.push({ content });
    res.status(201).json({ message: 'Created' });
  } else {
    res.status(400).json({ error: 'Invalid todo' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ todo-backend running on port ${PORT}`);
});
