const express = require('express');
const fs = require('fs');
const app = express();

const timestampPath = '/usr/src/app/data/timestamp.txt';
const countPath = '/usr/src/app/data/count.txt';

const PORT = process.env.PORT || 3000;

app.get('/log', (req, res) => {
  let count = 0;

  // Load and increase counter
  if (fs.existsSync(countPath)) {
    count = parseInt(fs.readFileSync(countPath, 'utf8')) || 0;
  }
  count += 1;
  fs.writeFileSync(countPath, count.toString());

  // Write new timestamp
  const timestamp = new Date().toISOString();
  fs.writeFileSync(timestampPath, timestamp);

  res.send(`${timestamp}\nPing / Pongs: ${count}`);
});

app.listen(PORT, () => {
  console.log(`Reader listening on port ${PORT}`);
});
