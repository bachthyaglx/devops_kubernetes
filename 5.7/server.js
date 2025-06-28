const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

let counter = 0;

app.get('/pingpong', (req, res) => {
  counter++;
  res.send(`Ping / Pongs: ${counter}`);
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
