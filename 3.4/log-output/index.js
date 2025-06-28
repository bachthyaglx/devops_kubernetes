const express = require('express');
const app = express();
app.get('/', (_, res) => {
  res.send(`${new Date().toISOString()} - ${Math.random().toString(36).slice(2)}`);
});
app.listen(3000, () => console.log('Log-output running'));
