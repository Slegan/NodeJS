import http from 'http';
import path from 'path';

import reverser from path.join(__dirname, './task3.1.js');
import readCsvFile from path.join(__dirname, './task3.2.js');

const server = http.createServer((req, res) => {
  res.end('Hello from the server');
  readCsvFile();
  reverser();
}).listen(4001);

console.log('Server is up and running');

export default server;