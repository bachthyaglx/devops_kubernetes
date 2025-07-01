const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const message = process.env.MESSAGE;
const pingpongUrl = process.env.PINGPONG_URL;

const filePath = '/usr/src/app/config/information.txt';
let fileContent = '';
try {
  fileContent = fs.readFileSync(filePath, 'utf8');
} catch (err) {
  fileContent = '❌ Failed to read config file';
}

app.get('/', async (req, res) => {
  const outputLines = [
    `file content: ${fileContent.trim()}`,
    `env variable: MESSAGE=${message}`,
    new Date().toISOString()
  ];

  if (pingpongUrl) {
    try {
      const response = await axios.get(pingpongUrl);
      outputLines.push(response.data);
    } catch (err) {
      outputLines.push('❌ Error contacting pingpong service');
    }
  } else {
    outputLines.push('ℹ️ No pingpong URL set');
  }

  console.log(outputLines.join('\n'));
  res.send(outputLines.join('<br>'));
});

app.listen(3000, '0.0.0.0', () => {
  console.log('App listening on port 3000');
});
