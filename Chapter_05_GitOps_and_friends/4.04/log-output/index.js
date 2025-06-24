const express = require('express');

const app = express();

app.get('/', (_, res) => {
  res.send(`${new Date().toISOString()} - ${Math.random().toString(36).slice(2)}`);
});

// readiness endpoint
app.get('/healthz', (_, res) => {
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Log-output running'));
