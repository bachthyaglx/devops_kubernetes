const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const message = process.env.MESSAGE || '⚠️ MESSAGE not set';
const pingpongUrl = process.env.PINGPONG_URL;

if (!pingpongUrl) {
  console.error("❌ PINGPONG_URL is not defined. Exiting...");
  process.exit(1);
}

const filePath = path.join(__dirname, 'config', 'information.txt');
let fileContent = '';

try {
  fileContent = fs.readFileSync(filePath, 'utf8');
} catch (err) {
  fileContent = '❌ Failed to read config file';
}

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(pingpongUrl);

    const logEntryLines = [
      `${new Date().toISOString()}`,
      response.data
    ];

    const outputLines = [
      `file content: ${fileContent.trim()}`,
      `env variable: MESSAGE=${message}`,
      ...logEntryLines
    ];

    console.log(outputLines.join('\n'));
    res.send(outputLines.join('<br>'));
  } catch (err) {
    console.error("❌ Failed to fetch pingpong data:", err.message);
    res.status(500).send('❌ Error contacting pingpong service');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Log Output app running on port ${PORT}`);
});
