const fs = require('fs');
const path = '/usr/src/app/data/timestamp.txt';

const writeTimestamp = () => {
  const timestamp = new Date().toISOString();
  fs.writeFileSync(path, timestamp);
  console.log(`Timestamp written: ${timestamp}`);
};

setInterval(writeTimestamp, 5000);
