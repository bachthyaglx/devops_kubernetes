const express = require('express');
const fs = require('fs');
const { https } = require('follow-redirects');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const IMAGE_PATH = '/usr/src/app/files/image.jpg';

const downloadImage = () => {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(IMAGE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    console.log('📥 Downloading new image...');
    const file = fs.createWriteStream(IMAGE_PATH);

    https.get('https://picsum.photos/1200', (res) => {
      if (res.statusCode !== 200) {
        console.error(`❌ Failed to fetch image: ${res.statusCode}`);
        file.close();
        fs.unlinkSync(IMAGE_PATH);
        return reject(`Status: ${res.statusCode}`);
      }

      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log('✅ Image downloaded and saved to:', IMAGE_PATH);
          resolve();
        });
      });
    }).on('error', (err) => {
      console.error('❌ Download error:', err.message);
      file.close();
      fs.unlink(IMAGE_PATH, () => reject(err.message));
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
