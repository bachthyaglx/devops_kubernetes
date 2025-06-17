const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const app = express();
const path = '/usr/src/app/data/timestamp.txt';

const PORT = process.env.PORT || 3000;

app.get('/log', (req, res) => {
  if (fs.existsSync(path)) {
    const content = fs.readFileSync(path, 'utf8');
    const hash = uuidv4();
    res.send(`${content}: ${hash}`);
  } else {
    res.send('No timestamp available.');
  }
});

app.listen(PORT, () => {
  console.log(`📖 Log Reader listening on port ${PORT}`);
});
