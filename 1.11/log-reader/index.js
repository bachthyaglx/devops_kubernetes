const express = require('express');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3033;

app.get('/log', (req, res) => {
  const filePath = '/usr/src/app/data/log.txt';
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Log file not found');
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  res.setHeader('Content-Type', 'text/plain');
  res.send(content);
});

app.listen(PORT, () => {
  console.log(`Reader running on port ${PORT}`);
});
