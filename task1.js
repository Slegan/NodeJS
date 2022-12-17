const process = require('process');

process.stdin.on('data', (data) => {
  const reversedOutput = data.toLocaleString().split('').reverse().join('');
  process.stdout.write(reversedOutput + '\n');
})

process.stdin.on('close', () => {
  process.stdout.write('task1 end');
  console.log('console task1 closed');
})