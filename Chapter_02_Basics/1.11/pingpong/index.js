const express = require('express');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3034;

app.get('/pingpong', (req, res) => {
  console.log('Received ping');
  const timestamp = new Date().toISOString();
  const logLine = `pong - ${timestamp}\n`;

  fs.appendFileSync('/usr/src/app/data/log.txt', logLine); // Ghi vào file shared
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Ping-pong running on ${PORT}`);
});
