const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Load environment variable
const message = process.env.MESSAGE;

// ✅ Load file from mounted ConfigMap
const filePath = path.join(__dirname, 'config', 'information.txt');
let fileContent = '';

try {
  fileContent = fs.readFileSync(filePath, 'utf8');
} catch (err) {
  fileContent = '❌ Failed to read config file';
}

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://pingpong-svc:3000/pingpong');
    const logEntry = `${new Date().toISOString()}: ${response.data}`;

    console.log(`file content: ${fileContent.trim()}`);
    console.log(`env variable: MESSAGE=${message}`);
    console.log(logEntry);

    res.send(logEntry);
  } catch (err) {
    res.status(500).send('❌ Error contacting pingpong service');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Log Output app running on port ${PORT}`);
});
