const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://pingpong-svc:3000/pingpong');
    const logEntry = `${new Date().toISOString()}: ${response.data}`;
    console.log(logEntry);
    res.send(logEntry);
  } catch (err) {
    res.status(500).send('❌ Error contacting pingpong service');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Log Output app running on port ${PORT}`);
});
