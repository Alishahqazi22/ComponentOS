const { spawnSync } = require('child_process');
const path = require('path');

const bin = path.join(__dirname, '..', 'bin', 'componentos.js');

function run(args) {
  const res = spawnSync('node', [bin, ...args], { encoding: 'utf8' });
  console.log(`> node ${bin} ${args.join(' ')}`);
  console.log(res.stdout);
  if (res.status !== 0) {
    console.error('Command failed with code', res.status, res.stderr);
    process.exit(res.status || 1);
  }
}

console.log('Running CLI smoke tests...');
run(['--version']);
run(['--help']);
run(['list']);
run(['info', 'button']);
console.log('CLI smoke tests passed.');
