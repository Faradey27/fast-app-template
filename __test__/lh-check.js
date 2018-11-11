const { spawn } = require('child_process');

const exec = command => new Promise((resolve, reject) => {
  const testProcess = spawn(command, { shell: true, stdio: [process.stdin, process.stdout, process.stderr] });

  testProcess.on('exit', (code) => {
    if (code === 0) {
      resolve();
    }

    reject({ code });
  });
});

const prepareCategories = () => {
  const lhr = require('../tmp/_lh-report.json');

  return Object.keys(lhr.categories).reduce((acc, categoryName) => {
    const category = lhr.categories[categoryName];
    acc[category.id] = Math.round(category.score * 100);
    return acc
  }, {});
}

const prepareLighthouseReport = () => exec('npm run lh');

const run = async () => {
  await prepareLighthouseReport();
  const scores = prepareCategories();
  Object.keys(scores).forEach(name => {
    if (scores[name] !== 100) {
      console.error('REGRESSION:', name, '. RESULT:', scores[name]);
      process.exit(1);
    }
  });
  console.log('PASSED');
  process.exit(0);
}

run();

