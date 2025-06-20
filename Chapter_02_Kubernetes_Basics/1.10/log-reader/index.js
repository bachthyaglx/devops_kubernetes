const express = require('express');
const fs = require('fs');
const app = express();

const LOG_PATH = '/usr/src/app/data/output.log';

const PORT = 3033;

app.get('/log', (req, res) => {
  if (fs.existsSync(LOG_PATH)) {
    const data = fs.readFileSync(LOG_PATH, 'utf8');
    res.send(`<pre>${data}</pre>`);
  } else {
    res.send('Log file not found.');
  }
});


app.listen(PORT, () => {
  console.log(`Reader running on port ${PORT}`);
});
