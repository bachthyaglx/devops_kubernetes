const express = require('express');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const IMAGE_PATH = '/usr/src/app/data/image.jpg';
const ONE_HOUR = 60 * 60 * 1000;

// Download a fresh image once per hour
const downloadImageIfNeeded = async () => {
  try {
    if (!fs.existsSync(IMAGE_PATH) || (Date.now() - fs.statSync(IMAGE_PATH).mtimeMs) > ONE_HOUR) {
      const response = await axios({
        url: 'https://picsum.photos/1200',
        method: 'GET',
        responseType: 'stream'
      });

      const writer = fs.createWriteStream(IMAGE_PATH);
      response.data.pipe(writer);
      console.log('✅ Downloaded new image');
    }
  } catch (err) {
    console.error('❌ Failed to download image:', err.message);
  }
};

downloadImageIfNeeded();
setInterval(downloadImageIfNeeded, ONE_HOUR);

app.get('/', (req, res) => {
  const hasImage = fs.existsSync(IMAGE_PATH);
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; max-width: 600px; margin: 2rem auto; }
          img { width: 100%; max-width: 100%; margin-bottom: 1rem; }
          input { width: 70%; padding: 8px; }
          button { padding: 8px; }
          ul { padding-left: 1rem; margin-top: 1rem; }
        </style>
      </head>
      <body>
        ${hasImage ? `<img src="/image" alt="Random image"/>` : '<p>No image available.</p>'}

        <input type="text" id="todoInput" maxlength="140" placeholder="Enter a todo..." />
        <button onclick="addTodo()">Create TODO</button>

        <ul id="todoList">
          <li>TODO 1</li>
          <li>TODO 2</li>
        </ul>

        <script>
          function addTodo() {
            const input = document.getElementById('todoInput');
            const value = input.value.trim();
            if (!value) return;
            const li = document.createElement('li');
            li.textContent = value;
            document.getElementById('todoList').appendChild(li);
            input.value = '';
          }
        </script>
      </body>
    </html>
  `);
});

app.get('/image', (req, res) => {
  if (fs.existsSync(IMAGE_PATH)) {
    res.sendFile(IMAGE_PATH);
  } else {
    res.status(404).send('Image not found');
  }
});

app.listen(PORT, () => {
  console.log(`✅ App running at http://localhost:${PORT}`);
});
