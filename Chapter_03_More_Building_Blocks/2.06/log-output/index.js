const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const message = process.env.MESSAGE;
const pingpongUrl = process.env.PINGPONG_URL;

const filePath = path.join(__dirname, 'config', 'information.txt');
let fileContent = '';

try {
  fileContent = fs.readFileSync(filePath, 'utf8');
} catch (err) {
  fileContent = '❌ Failed to read config file';
}

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(process.env.PINGPONG_URL);

    const logEntryLines = [
      `${new Date().toISOString()}`,
      response.data // <-- this is the pingpong count string
    ];

    const outputLines = [
      `file content: ${fileContent.trim()}`,
      `env variable: MESSAGE=${message}`,
      ...logEntryLines
    ];

    console.log(outputLines.join('\n'));   // ✅ log to terminal with newlines
    res.send(outputLines.join('<br>'));    // ✅ show separate lines in browser
  } catch (err) {
    res.status(500).send('❌ Error contacting pingpong service');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Log Output app running on port ${PORT}`);
});
