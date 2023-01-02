
import process from 'process';

function reverser() {
  process.stdin.on('data', (data) => {
    const reversedOutput = data.toLocaleString().split('').reverse().join('');
    process.stdout.write(reversedOutput + '\n');
  })
  
  process.stdin.on('SIGINT', () => {
    process.stdout.write('task1 end');

    process.exit();
  })
}

export default reverser;
