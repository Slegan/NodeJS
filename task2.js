const fs = require('fs');
const split2 = require('split2');
const csvFormater = require('csvtojson');

const inputFile = './csv/example.csv';
const outputFile = './result.txt'

const readStream = fs.createReadStream(inputFile);
const writeStream = fs.createWriteStream(outputFile, 'utf-8');

let isFirstChunk = true;
let fileHeaders;

readStream
.pipe(split2())
.on('data', (chunk) => {
  if (isFirstChunk) {
    fileHeaders = chunk.split(',');
    isFirstChunk = false;
  } else{
    csvFormater({
      output:'json',
      headers: fileHeaders,
      noheader: true
    })
    .fromString(chunk)
    .then((jsonRow)=>{
      console.log(JSON.stringify(jsonRow[0]));
      writeStream.write(JSON.stringify(jsonRow[0]) + '\n');
    })
  }
});

readStream.on('close', () => {
  console.log('file was read');
  writeStream.end();
});

readStream.on('error', (error) => {
  console.error(error.message);
});
