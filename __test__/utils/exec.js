const { spawn } = require('child_process');

module.exports = command => new Promise((resolve, reject) => {
  const testProcess = spawn(command, { shell: true, stdio: [process.stdin, process.stdout, process.stderr] });

  testProcess.on('exit', (code) => {
    if (code === 0) {
      resolve();
    }

    reject({ code });
  });
});
