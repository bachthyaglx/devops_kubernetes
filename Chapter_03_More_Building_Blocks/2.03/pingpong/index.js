const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let counter = 0;

app.get('/pingpong', (req, res) => {
  counter += 1;
  res.send(`Ping / Pongs: ${counter}`);
});

app.listen(PORT, () => {
  console.log(`✅ Pingpong app running on port ${PORT}`);
});
