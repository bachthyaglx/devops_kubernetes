const fs = require('fs');

const content = `Writer started with string: w55a5c - ${new Date().toISOString()}\n`;
const filePath = '/usr/src/app/data/log.txt';

// Tạo file nếu chưa có
fs.appendFileSync(filePath, content);

console.log('Writer has written to log file.');
setInterval(() => {
  fs.appendFileSync(filePath, `Writer heartbeat: ${new Date().toISOString()}\n`);
}, 5000);
