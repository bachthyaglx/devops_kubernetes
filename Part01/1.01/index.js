const crypto = require('crypto');
const id = crypto.randomUUID();
console.log('Generated ID:', id);

setInterval(() => {
  console.log(`${new Date().toISOString()}: ${id}`);
}, 5000);
