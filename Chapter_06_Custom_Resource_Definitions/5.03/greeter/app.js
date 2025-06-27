const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello from version 1'); // switch to version 2
});

app.listen(port, () => console.log(`Greeter running on ${port}`));
