const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

const status = {
  uuid: uuidv4(),
  timestamp: new Date().toISOString(),
};

setInterval(() => {
  status.timestamp = new Date().toISOString();
  console.log(`${status.timestamp}: ${status.uuid}`);
}, 5000);

app.get('/status', (req, res) => {
  res.json(status);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started on port ${PORT}`);
});
