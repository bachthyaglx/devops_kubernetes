const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Todo App</title></head>
      <body>
        <h1>Welcome to Todo App!</h1>
        <p>This is served via Ingress.</p>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Todo App running on port ${PORT}`);
});
