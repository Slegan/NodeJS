import fs from 'fs';
import csvFormater from 'csvtojson';

function readCsvFile() {
  const inputFile = './csv/example.csv';
  const outputFile = './result.txt'

  const readStream = fs.createReadStream(inputFile);
  const writeStream = fs.createWriteStream(outputFile, 'utf-8');

  csvFormater()
  .fromStream(readStream)
  .subscribe((json) => {
    return new Promise((resolve) => {
      writeStream.write(JSON.stringify(json) + '\n');
      resolve();
    });
  });

  readStream.on('close', () => {
    console.log('file was read');
    writeStream.end();
  });

  readStream.on('error', (error) => {
    console.error(error.message);
  });
}

export default readCsvFile