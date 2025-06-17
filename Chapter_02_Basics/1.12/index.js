const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const IMAGE_PATH = '/usr/src/app/data/image.jpg';

const isImageFresh = () => {
  if (!fs.existsSync(IMAGE_PATH)) return false;
  const stats = fs.statSync(IMAGE_PATH);
  const ageInMs = Date.now() - stats.mtimeMs;
  return ageInMs < 60 * 60 * 1000; // 1 hour
};

const downloadImage = () => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(IMAGE_PATH);
    https.get('https://picsum.photos/1200', (res) => {
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlinkSync(IMAGE_PATH);
      reject(err.message);
    });
  });
};

app.get('/image', async (req, res) => {
  try {
    if (!isImageFresh()) await downloadImage();
    res.sendFile(IMAGE_PATH);
  } catch {
    res.status(500).send('Failed to fetch image');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
