const express = require('express');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const IMAGE_PATH = '/usr/src/app/data/image.jpg';
const ONE_HOUR = 60 * 60 * 1000;

// Download new image if needed
const downloadImageIfNeeded = async () => {
  try {
    if (!fs.existsSync(IMAGE_PATH) || (Date.now() - fs.statSync(IMAGE_PATH).mtimeMs) > ONE_HOUR) {
      const response = await axios({
        url: 'https://picsum.photos/1200',
        method: 'GET',
        responseType: 'stream',
      });
      const writer = fs.createWriteStream(IMAGE_PATH);
      response.data.pipe(writer);
      console.log('✅ New image downloaded');
    }
  } catch (err) {
    console.error('❌ Failed to download image:', err.message);
  }
};

downloadImageIfNeeded();
setInterval(downloadImageIfNeeded, ONE_HOUR);

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const todoRes = await axios.get('http://todo-backend-svc:3000/todos');
    const todos = todoRes.data;

    const todoListHTML = todos.map(t => `<li>${t.content}</li>`).join('');

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial; max-width: 600px; margin: 2rem auto; }
            img { width: 100%; max-width: 100%; margin-bottom: 1rem; }
            input, button { padding: 8px; margin: 4px 0; }
            ul { padding-left: 1rem; margin-top: 1rem; }
          </style>
        </head>
        <body>
          ${fs.existsSync(IMAGE_PATH) ? `<img src="/image" alt="random image"/>` : '<p>No image.</p>'}
          <form onsubmit="event.preventDefault(); addTodo()">
            <input type="text" id="todoInput" maxlength="140" placeholder="Enter a todo..." required />
            <button type="submit">Create TODO</button>
          </form>
          <ul id="todoList">${todoListHTML}</ul>

          <script>
            async function addTodo() {
              const input = document.getElementById("todoInput");
              const content = input.value.trim();
              if (!content) return;
              await fetch("/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content })
              });
              window.location.reload();
            }
          </script>
        </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send("Error fetching todos");
  }
});

app.post('/todos', async (req, res) => {
  try {
    const { content } = req.body;
    await axios.post('http://todo-backend-svc:3000/todos', { content });
    res.status(201).json({ message: 'Created' });
  } catch (err) {
    res.status(500).json({ error: 'Could not forward to backend' });
  }
});

app.get('/image', (req, res) => {
  if (fs.existsSync(IMAGE_PATH)) {
    res.sendFile(IMAGE_PATH);
  } else {
    res.status(404).send('Image not found');
  }
});

app.listen(PORT, () => {
  console.log(`✅ todo-app running on port ${PORT}`);
});
