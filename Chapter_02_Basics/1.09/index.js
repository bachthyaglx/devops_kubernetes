const express = require('express');
const app = express();

let counter = 0;

const PORT = process.env.PORT || 3033;

app.get('/pingpong', (req, res) => {
  counter++;
  res.send(`pong ${counter}`);
});

app.listen(PORT, () => {
  console.log(`Ping-Pong App listening on port ${PORT}`);
});
