const fs = require('fs');
const path = '/usr/src/app/data/output.log';

const randomString = Math.random().toString(36).substring(7);

console.log(`Writer started with string: ${randomString}`);

setInterval(() => {
  const logLine = `${new Date().toISOString()} - ${randomString}\n`;
  fs.appendFileSync(path, logLine);
}, 5000);
