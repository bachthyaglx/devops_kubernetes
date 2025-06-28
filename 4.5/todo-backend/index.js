const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [];
let idCounter = 1;

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const content = req.body.content;
  if (content && content.length <= 140) {
    const newTodo = { id: idCounter++, content, done: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } else {
    res.status(400).json({ error: 'Invalid todo' });
  }
});

// NEW: Mark todo as done
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Not found' });
  todo.done = true;
  res.json(todo);
});

app.listen(PORT, () => {
  console.log(`✅ todo-backend running on port ${PORT}`);
});
