const express = require('express');
const fs = require('fs');
const axios = require('axios');
const app = express();
const port = 8080;

app.get('/status', async (req, res) => {
  let greeting = 'Unavailable';
  try {
    const response = await axios.get('http://log-gateway-istio/greeter');
    greeting = response.data;
  } catch (err) {
    console.error('Failed to fetch greeting', err.message);
  }

  const content = fs.readFileSync('/output/two-line-file.txt', 'utf8');
  res.send(`Ping / Pongs: 370\nenv-variable: MESSAGE=hello world\nfile contents: ${content}\ngreetings: ${greeting}`);
});

app.listen(port, () => console.log(`Log-output running on ${port}`));
